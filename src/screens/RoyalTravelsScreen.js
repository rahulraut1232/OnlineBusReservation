import React from "react";
import { Link } from "react-router-dom";
import HomeNavigation from "../components/HomeNavigation";
import image1 from "../assets/image-1.jpg";
import image2 from "../assets/image-2.jpg";
import image3 from "../assets/image-3.jpg";

const RoyalTravelsScreen = () => {
  return (
    <div>
      <HomeNavigation />
      <header className="header">
        <section className="destinations">
          <h3>Travel With Us All Over India</h3>
          <div className="grid">
            <div>
              <img src={image1} alt="destination-1" />
              <h3>BUSES</h3>
              <p>1000+</p>
              <p>Ac/Non-Ac</p>
              <p>Seater/Sleeper</p>
            </div>

            <div>
              <img src={image2} alt="destination-2" />
              <h3>ROUTES</h3>
              <p>400+</p>
              <p>From Various City To City</p>
              <p>From Various States To States</p>
            </div>

            <div>
              <img src={image3} alt="destination-3" />
              <h3>USERS</h3>
              <p>50000+</p>
              <p>Happy Passengers</p>
              <p>Number Is Still Increasing</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="text">
            <b>
              <h2>Your Comfort Is Our First Priority</h2>
            </b>
          </div>
        </section>
      </header>
    </div>
  );
};

export default RoyalTravelsScreen;
