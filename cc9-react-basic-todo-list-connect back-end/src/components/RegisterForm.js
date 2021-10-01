import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../config/axios';

function RegisterForm({ setError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showImage, setShowImage] = useState('');

  const history = useHistory();

  const handleSubmitRegister = e => {
    e.preventDefault();
    // axios
    //   .post('/register', {
    //     username,
    //     password,
    //     email,
    //     confirmPassword,
    //   })
    //   .then(() => {
    //     history.push({
    //       pathname: '/login',
    //       state: {
    //         successMessage: 'your account has been created',
    //       },
    //     });
    //   })
    //   .catch(err => {
    //     if (err.response && err.response.status === 400) {
    //       setError(err.response.data.message);
    //     }
    //   });

    const formData = new FormData(); //สร้าง body ในรูปแบบ multipart/form-data
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('cloudinput', profileImage); //key ต้องตรงกับที่กำหนดไว้ใน post

    axios
      .post('/upload-to-cloud', formData)
      .then(res => {
        setShowImage(res.data.user.password);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeUploadFile = e => {
    console.log(e.target.files);
    setProfileImage(e.target.files[0]);
  };

  return (
    <>
      <div className='border shadow p-3 mb-4'>
        <form onSubmit={handleSubmitRegister}>
          <div className='mb-3'>
            <label className='form-label'>Email address</label>
            <input
              type='text'
              className='form-control'
              // placeholder='Email address'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Username</label>
            <input
              type='text'
              className='form-control'
              // placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              // placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='form-label'>Confirm password</label>
            <input
              type='password'
              className='form-control'
              // placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='form-label'>Profile Image</label>
            <input
              type='file'
              className='form-control'
              onChange={handleChangeUploadFile}
            />
            {/*multiple */}
            {/* <label  className='form-label'>
            Profile Image Multiple
          </label>
          <input
            type='file'
            className='form-control'
            onChange={handleChangeUploadFile}
            multiple
          /> */}
          </div>

          <button type='submit' className='btn btn-success'>
            Register
          </button>
        </form>
      </div>
      {showImage && (
        <img src={showImage} width='80' className='rounded-circle' alt='user' />
      )}
    </>
  );
}

export default RegisterForm;
