import { useNavigate } from "react-router-dom";
import WelcomeBackground from "../../Assets/WelcomeImg.jpg";
import logo from "../../Assets/iShareLogo.png";
import "./WelcomeStyle.css";
const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-body">
        <div className="logo-container">
          <img src={logo} alt="iShare" />
          <span>iShare</span>
        </div>

        <h1>Connect. Explore. Share with iShare.</h1>
        <p>
          Welcome to iShare, the social media app that empowers you to connect,
          discover, and share seamlessly. With iShare, you can connect with
          friends, explore new horizons, and express yourself effortlessly.
        </p>
        <button className="primary-btn" onClick={() => navigate("./signup")}>
          Join Now
        </button>
        <button className="link-btn" onClick={() => navigate("./login")}>
          Already have an account?
        </button>
      </div>
      <img src={WelcomeBackground} alt="background" className="welcome-img" />
    </div>
  );
};
export { Welcome };
