import { FormEvent } from "react";
import Logo from "../assets/stream-chat-logo.svg";
import { Link } from "react-router-dom";
import "../scss/Auth.scss";
import { auth, db } from "../server/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const FormPopup = ({ page }: { page: string }) => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const displayName = ((e.target as HTMLFormElement)[0] as HTMLFormElement)
      .value;
    const email = ((e.target as HTMLFormElement)[1] as HTMLFormElement).value;
    const password = ((e.target as HTMLFormElement)[2] as HTMLFormElement)
      .value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email,
        password,
      });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}: ${errorMessage}`);
    }
  };

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
        <form onSubmit={handleSubmit}>
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
