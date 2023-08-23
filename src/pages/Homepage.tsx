import { useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import { useEffect } from "react";

const Homepage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  return <div>Homepage</div>;
};

export default Homepage;
