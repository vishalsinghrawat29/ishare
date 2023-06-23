import { useNavigate } from "react-router-dom";
import WelcomeBackground from "../../Assets/Welcome-background.jpg";
import logo from "../../Assets/iShare-Logo.png";
import "./WelcomeStyle.css";
const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <img src={WelcomeBackground} alt="background" className="welcome-img" />
      <div className="welcome-body">
        <p className="logo-container">
          <img src={logo} alt="iShare" className="logo" /> <span>iShare</span>
        </p>

        <h1>Join, Connect, Share!</h1>
        <p>
          Welcome to iShare platform! Join our vibrant community today and
          connect with friends from around the world. Share your thoughts,
          photos, and experiences with ease. Sign up now and let your voice be
          heard.
        </p>
        <button className="primary-btn" onClick={() => navigate("./signup")}>
          Join Now
        </button>
        <button className="secondary-btn" onClick={() => navigate("./login")}>
          Alread Have Account !
        </button>
      </div>
    </div>
  );
};
export { Welcome };
