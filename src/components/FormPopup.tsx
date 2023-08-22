import Logo from "../assets/stream-chat-logo.svg";
import { Link } from "react-router-dom";
import "../scss/Auth.scss";

interface formProps {
  page: string;
}

const FormPopup = (props: formProps) => {
  let { page } = props;
  return (
    <div className="form-popup">
      <div className="stream-chat-banner">
        <div className="container">
          <img src={Logo} alt="StreamChat Logo" />
          <h1>
            Stream<span>Chat</span>
          </h1>
          <h2>Chat accross the globe</h2>
        </div>
      </div>
      <div className="form-container">
        <div>
          <h2>
            Stream<span>Chat</span>
          </h2>
          <p>{page == "register" ? "Register" : "Login"} using your email ID</p>
        </div>
        <form>
          {page == "register" && <input type="text" placeholder="Name" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input
            type="submit"
            value={page == "register" ? "Register" : "Login"}
            className="call-to-action"
          />
        </form>
        <small>
          {page == "register"
            ? `Already have an account?`
            : `Have not registered yet?`}{" "}
          {page == "register" ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </small>
      </div>
    </div>
  );
};

export default FormPopup;
