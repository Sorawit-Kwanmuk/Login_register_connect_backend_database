import TodoItem from './TodoItem';

function TodoList({ lists }) {
  return (
    <>
      <div className='card shadow rounded-0'>
        <div className='card-body d-flex justify-content-center bg-warning'>
          <span className='text-black-50'>
            {lists.filter(item => !item.status).length} Task Remaining
          </span>
        </div>
      </div>
      {lists.map(item => (
        <TodoItem key={item.id} list={item} />
      ))}
    </>
  );
}

export default TodoList;
