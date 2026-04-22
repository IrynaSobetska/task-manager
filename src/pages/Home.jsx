import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-cont">
      <div className="tiny-p">
        <svg width="10" height="10">
          <circle cx="5" cy="5" r="5" fill="#70b99b" />
        </svg>
        <p>Minimalistic Task Managment</p>
      </div>
      <h1>
        Stay focused. <br /> Get things done.
      </h1>
      <p className="grey-p">
        This website is still in development, most of the feature may not work.
        Enjoy the test version.
      </p>

      <Link className="a-btn" to="/project">
        Go to Project
      </Link>
    </div>
  );
};

export default Home;
