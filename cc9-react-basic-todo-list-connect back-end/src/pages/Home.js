import axios from '../config/axios';
import { useContext, useEffect, useState } from 'react';
import AddForm from '../components/AddForm';
import TodoList from '../components/TodoList';
import { useHistory } from 'react-router-dom';
import { removeToken } from '../services/localStorage';
import { AuthContext } from '../contexts/authContext';

function Home() {
  const [lists, setLists] = useState([]);

  const history = useHistory();

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('/lists')
      .then(res => {
        setLists(res.data.lists);
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          removeToken();
          setUser(null);
          history.push('/login');
          // window.location.replace('/login');
        }
      });
  }, [setUser, history]);

  return (
    <>
      <AddForm setLists={setLists} />
      <TodoList lists={lists} />
    </>
  );
}

export default Home;
