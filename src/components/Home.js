import React from "react";
import logo from "../Underground.svg";

const Home = () => {
  return (
    <div className="app__home">
      <img
        style={{ display: "block", maxWidth: "60%", margin: "0 auto" }}
        src={logo}
        alt="London underground logo"
      />
    </div>
  );
};

export default Home;
