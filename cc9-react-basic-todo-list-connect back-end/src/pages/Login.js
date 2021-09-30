import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';

function Login() {
  const [error, setError] = useState('');

  const location = useLocation();
  const successMessage = location.state?.successMessage;

  return (
    <>
      {successMessage && (
        <Notification message={successMessage} color={'success'} />
      )}
      {error && <Notification message={error} />}
      <LoginForm setError={setError} />
    </>
  );
}

export default Login;
