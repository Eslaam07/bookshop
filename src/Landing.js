import React from "react";
import classes from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={classes.landing}>
      <div className={classes.texts}>
        <h3>Build your library</h3>
        <p>Buy two selected books and get one for free</p>
      </div>
      <img src="./images/landing.png" alt="" />
    </div>
  );
};

export default Landing;
