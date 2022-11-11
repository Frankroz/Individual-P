import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  return (
    <div>
      {favorites.length ? (
        favorites.map((favdog) => (
          <Card
            key={favdog.name + favdog.id}
            dog={favdog}
          />
        ))
      ) : (
        <h2>There are no favorites :(</h2>
      )}
    </div>
  );
}

export default Favorites;
