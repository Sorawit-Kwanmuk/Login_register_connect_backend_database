function TodoItem({ list: { id, title, status } }) {
  return (
    <div
      className={`card shadow rounded-0 bd-callout bd-callout-${
        status ? 'success' : 'warning'
      }`}>
      <div className='card-body d-flex justify-content-between align-items-center'>
        <span>{title}</span>
        <div className='btn-group'>
          <button className='btn btn-outline-info'>
            <i className={`bi-toggle2-${status ? 'on' : 'off'}`} />
          </button>
          <button className='btn btn-primary'>
            <i className='bi-pencil-square' />
          </button>
          <button className='btn btn-danger'>
            <i className='bi-trash' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
