import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Favorites.css"

function Favorites() {
  const favorites = useSelector((state) => state.favorites);

  return document.cookie ? (
    <div>
      <NavBar />
      <div className="favContainer dogsToShow">
        {favorites.length ? (
          favorites.map((favdog) => (
            <Card key={favdog.name + favdog.id} dog={favdog} />
          ))
        ) : (
          <h2 className="favAlert">There are no favorites :(</h2>
        )}
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <NavBar />
      <div className="favContainer">
        <h1 className="favAlert">You should login to check your favorites</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Favorites;
