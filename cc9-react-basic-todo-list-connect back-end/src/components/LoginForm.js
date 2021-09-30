import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../config/axios';
import { AuthContext } from '../contexts/authContext';
import { setToken } from '../services/localStorage';
import jwtDecode from 'jwt-decode';

function LoginForm({ setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(AuthContext);

  const history = useHistory();

  const handleSubmitLogin = async e => {
    e.preventDefault();
    try {
      //validate
      const res = await axios.post('/login', {
        username: username,
        password: password,
      });
      setToken(res.data.token);
      setUser(jwtDecode(res.data.token));
      history.push('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className='border shadow p-3 mb-4'>
      <form onSubmit={handleSubmitLogin}>
        <div className='mb-3'>
          <label className='form-label'>Username</label>
          <input
            type='text'
            className='form-control'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-success'>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
