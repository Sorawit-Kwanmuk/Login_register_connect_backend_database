function Container({ children }) {
  return (
    <div className='container'>
      <div className='mw-576 my-4 mx-auto'>{children}</div>
    </div>
  );
}

export default Container;
