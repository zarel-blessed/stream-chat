import { FormEvent, useState } from "react";
import Logo from "../assets/stream-chat-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Auth.scss";
import { auth, db } from "../server/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useUser } from "../Contexts/UserContext";

const FormPopup = ({ page }: { page: string }) => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (page == "register") {
      try {
        const displayName = (
          (e.target as HTMLFormElement)[0] as HTMLFormElement
        ).value;
        const email = ((e.target as HTMLFormElement)[1] as HTMLFormElement)
          .value;
        const password = ((e.target as HTMLFormElement)[2] as HTMLFormElement)
          .value;
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

        setUser({
          displayName,
          email,
          password,
        });

        navigate("/");
      } catch (error) {
        setError(true);
      }
    } else {
      try {
        const email = ((e.target as HTMLFormElement)[0] as HTMLFormElement)
          .value;
        const password = ((e.target as HTMLFormElement)[1] as HTMLFormElement)
          .value;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;

        const displayName = user.displayName;

        setUser({
          displayName,
          email,
          password,
        });

        navigate("/");
      } catch (error) {
        setError(true);
      }
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
        <small
          style={{
            color: "red",
          }}
        >
          {error && "Something went wrong"}
        </small>
      </div>
    </div>
  );
};

export default FormPopup;
