import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../actions/userAction";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Initialize email state
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    // Clear errors when unmounting the component
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update the email state
            />
          </div>
          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
