import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>
        Simple website task manager that should grow in something bigger in
        future
      </h1>
      <h2>Enjoi test version</h2>

      <Link className="b-btn" to="/project">
        Test available functions
      </Link>
    </div>
  );
};

export default Home;
