function Suspended(props, { forced, settings }) {
  return (
    <div className="nk-content " style={{ textAlign: "center", margin: '40px' }}>
      <h2>Your Account has been suspended by admin. Contact {settings && settings.email} for further assistance</h2>
    </div>
  );
}

export default Suspended;
