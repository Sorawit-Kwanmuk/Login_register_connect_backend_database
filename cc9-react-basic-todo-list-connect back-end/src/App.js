import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/authContext';
import { Redirect } from 'react-router-dom';
import routes from './config/route';

// BrowserRouter มาจาก react-router-dom
function App() {
  const { user } = useContext(AuthContext);
  const role = user ? 'user' : 'guest';
  // routes[role] = [{path,component},{path,component},...]
  return (
    <>
      <Header />
      <Container>
        <Switch>
          {routes[role].route.map(item => (
            <Route
              key={item.path}
              exact
              path={item.path}
              component={item.component}
            />
          ))}
          <Redirect to={routes[role].redirect} />
          {/* {user ? (
            <>
              <Route exact path='/' component={Home} />
              <Redirect to='/' />
            </>
          ) : (
            <>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Redirect to='/login' />
            </>
          )} */}
        </Switch>
      </Container>
    </>
  );
}

export default App;
