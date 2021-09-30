function Notification({ message, color }) {
  return <div className={`alert alert-${color ?? 'danger'}`}>{message}</div>;
}

export default Notification;
