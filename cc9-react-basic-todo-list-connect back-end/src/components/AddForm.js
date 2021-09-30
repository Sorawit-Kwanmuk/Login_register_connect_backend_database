import { useState } from 'react';
import axios from '../config/axios';

function AddForm({ setLists }) {
  const [title, setTitle] = useState('');

  const handleSubmitAdd = e => {
    e.preventDefault();
    axios
      .post('/lists', { title })
      .then(res => {
        setLists(curLists => [res.data.list, ...curLists]);
        setTitle('');
      })
      .catch(err => {});
  };

  return (
    <div className='py-3 mb-3'>
      <form className='flex-fill' onSubmit={handleSubmitAdd}>
        <div className='input-group has-validation'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter new todo'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button className='btn btn-primary'>
            <i className='bi-save' />
          </button>

          {/* <div className='invalid-feedback'>Error</div> */}
        </div>
      </form>
    </div>
  );
}

export default AddForm;
