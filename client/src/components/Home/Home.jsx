import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { FaSearch } from "react-icons/fa";
import "./Home.css";
import Loader from "../Loader/Loader";

function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const global_status = useSelector((state) => state);
  const tempers = global_status.tempers;
  const [state, setState] = useState({
    dogs: [],
    page: 0,
    dogs_to_show: [],
    pageBtns: [],
  });
  let pages = Math.round(state.dogs.length / 8);

  // Create arrays for different things
  const getArray = (from, to) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  // Sorting functions
  const sortName = (type) => {
    if (type === "name_asc") {
      return setState((prevState) => {
        prevState.dogs = state.dogs.sort((a, b) => {
          let da = a.name.toLowerCase(),
            db = b.name.toLowerCase();

          if (da < db) {
            return -1;
          }
          if (da > db) {
            return 1;
          }
          return 0;
        });
        prevState.dogs_to_show = prevState.dogs.slice(0, 8);

        return { ...prevState };
      });
    }

    setState((prevState) => {
      prevState.dogs = state.dogs.sort((a, b) => {
        let da = a.name.toLowerCase(),
          db = b.name.toLowerCase();

        if (da > db) {
          return -1;
        }
        if (da < db) {
          return 1;
        }
        return 0;
      });
      prevState.dogs_to_show = prevState.dogs.slice(0, 8);

      return { ...prevState };
    });
  };

  const sortWeight = (type) => {
    setState((prevState) => {
      prevState.dogs = state.dogs.sort((a, b) => {
        let da, db;
        if (a.weight.hasOwnProperty("imperial"))
          da = a.weight.imperial.split("-");
        else da = a.weight.split("-");
        if (b.weight.hasOwnProperty("imperial"))
          db = b.weight.imperial.split("-");
        else db = b.weight.split("-");

        if (parseInt(db[0]) === parseInt(da[0])) {
          return parseInt(db[db.length - 1]) - parseInt(da[da.length - 1]);
        }
        if (type === "weight_asc") {
          return parseInt(da[0]) - parseInt(db[0]);
        }
        return parseInt(db[0]) - parseInt(da[0]);
      });
      prevState.dogs_to_show = prevState.dogs.slice(0, 8);

      return { ...prevState };
    });
  };

  // Filter by temper
  const filteByTemper = (temper) => {
    setState((prevState) => {
      prevState.dogs = []
        .concat(global_status.dogs)
        .filter((dog) => dog.temperament?.includes(temper));
      pages = Math.round(prevState.dogs.length / 8);
      prevState.dogs_to_show = prevState.dogs.slice(0, 8);
      if (pages === 0) prevState.pageBtns = [1];
      if (0 < pages && pages < 5) prevState.pageBtns = getArray(1, pages + 1);
      return { ...prevState };
    });
  };

  // Initiate with the different info
  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        dogs: [].concat(global_status.dogs),
        dogs_to_show: global_status.dogs.slice(0, 8),
        pageBtns: [1, 2, 3, 4, 5],
      };
    });
    setLoading(false);
  }, [global_status]);

  // Check for updates on the nav buttons
  useEffect(() => {
    setState((prevState) => {
      if (prevState.pageBtns[0] >= prevState.page + 1 && prevState.page) {
        prevState.pageBtns = getArray(
          prevState.pageBtns[0] - 4,
          prevState.pageBtns[0]
        );
      }

      if (
        prevState.pageBtns[prevState.pageBtns.length - 1] <=
        prevState.page + 1
      ) {
        if (prevState.pageBtns[prevState.pageBtns.length - 1] + 4 >= pages) {
          if (!pages) prevState.pageBtns = [1];
          else
            prevState.pageBtns = getArray(
              prevState.pageBtns[prevState.pageBtns.length - 1],
              prevState.pageBtns[prevState.pageBtns.length - 1] +
                (pages - prevState.pageBtns[prevState.pageBtns.length - 1])
            );
        } else {
          prevState.pageBtns = getArray(
            prevState.pageBtns[prevState.pageBtns.length - 1],
            prevState.pageBtns[prevState.pageBtns.length - 1] + 4
          );
        }
      }

      if (document.getElementById("Btn1") && prevState.page === 0)
        document.getElementById("Btn1").className = "selectedPageBtn";
      return { ...prevState };
    });
  }, [state.page, pages]);

  return (
    <div>
      <NavBar />
      <div>
        <div>
          <div className="filterContainer">
            <div className="innerFilterContainer">
              {/* Sort select */}
              <div>
                <select
                  className="homeSelect"
                  name="sort"
                  id="order"
                  defaultValue={"default"}
                  onChange={(e) => {
                    switch (e.currentTarget.value) {
                      case "name_asc":
                        sortName(e.currentTarget.value);
                        break;
                      case "name_desc":
                        sortName(e.currentTarget.value);
                        break;
                      case "weight_asc":
                        sortWeight(e.currentTarget.value);
                        break;
                      case "weight_desc":
                        sortWeight(e.currentTarget.value);
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <option value="default" disabled defaultValue={"default"}>
                    Sort by:
                  </option>
                  <option value="name_asc">Name (A-Z)</option>
                  <option value="name_desc">Name (Z-A)</option>
                  <option value="weight_asc">Weight (asc)</option>
                  <option value="weight_desc">Weight (desc)</option>
                </select>
              </div>
              {/* Source select */}
              <div>
                <select
                  className="homeSelect"
                  name="created"
                  id="created"
                  defaultValue={"default"}
                  onChange={(e) => {
                    switch (e.currentTarget.value) {
                      case "api":
                        setState((prevState) => {
                          prevState.dogs = []
                            .concat(global_status.dogs)
                            .filter(
                              (dog) => !dog.hasOwnProperty("temperaments")
                            );
                          prevState.page = 0;
                          pages = Math.round(prevState.dogs.length / 8);

                          if (prevState.dogs.length)
                            prevState.dogs_to_show = prevState.dogs.slice(0, 8);
                          else prevState.dogs_to_show = "No dogs were found :(";

                          if (pages === 0) prevState.pageBtns = [1];
                          if (0 < pages && pages < 5)
                            prevState.pageBtns = getArray(1, pages + 1);
                          return { ...prevState };
                        });
                        break;
                      case "created":
                        setState((prevState) => {
                          prevState.dogs = []
                            .concat(global_status.dogs)
                            .filter((dog) =>
                              dog.hasOwnProperty("temperaments")
                            );
                          prevState.page = 0;
                          pages = Math.round(prevState.dogs.length / 8);

                          if (prevState.dogs.length)
                            prevState.dogs_to_show = prevState.dogs.slice(0, 8);
                          else prevState.dogs_to_show = "No dogs were found :(";

                          if (pages === 0) prevState.pageBtns = [1];
                          if (0 < pages && pages < 5)
                            prevState.pageBtns = getArray(1, pages + 1);
                          return { ...prevState };
                        });
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <option value="default" disabled>
                    Source:
                  </option>
                  <option value="api">API</option>
                  <option value="created">Created</option>
                </select>
              </div>
              {/* Temperament select */}
              <div>
                <select
                  className="homeSelect"
                  name="tempers"
                  id="tempers"
                  defaultValue={"default"}
                  onChange={(e) => {
                    filteByTemper(e.currentTarget.value);
                  }}
                >
                  <option value="default" disabled>
                    Temperaments:
                  </option>
                  {tempers.map((temper) => (
                    <option key={temper} value={temper}>
                      {temper}
                    </option>
                  ))}
                </select>
              </div>
              {/* Clear filters btn */}
              <button
                className="clearFiltersBtn"
                onClick={() => {
                  document.getElementById("order").value = "default";
                  document.getElementById("created").value = "default";
                  document.getElementById("tempers").value = "default";

                  setState(() => {
                    pages = Math.round(
                      [].concat(global_status.dogs).length / 8
                    );
                    return {
                      page: 0,
                      dogs: [].concat(global_status.dogs),
                      dogs_to_show: global_status.dogs.slice(0, 8),
                      pageBtns: [1, 2, 3, 4, 5],
                    };
                  });
                }}
              >
                Clear filters
              </button>
            </div>
            <div className="searchBarContainer">
              <div className="innerSearchBarContainer">
                {/* Search Bar */}
                <form
                  action=""
                  onSubmit={(e) => {
                    setLoading(true);
                    e.preventDefault();
                    setState((prevState) => {
                      prevState.dogs = []
                        .concat(global_status.dogs)
                        .filter((dog) =>
                          dog.name
                            .toLowerCase()
                            .includes(
                              document
                                .getElementById("searchBar")
                                .value.toLowerCase()
                            )
                        );
                      pages = Math.round(prevState.dogs.length / 8);
                      if (prevState.dogs.length)
                        prevState.dogs_to_show = prevState.dogs.slice(0, 8);
                      else prevState.dogs_to_show = "No dogs were found :(";
                      if (pages === 0) prevState.pageBtns = [1];
                      if (0 < pages && pages < 5)
                        prevState.pageBtns = getArray(1, pages + 1);
                      return { ...prevState };
                    });
                    setLoading(false);
                  }}
                >
                  <input
                    className="searchBar"
                    type="name"
                    placeholder="Search"
                    id="searchBar"
                  />
                  <button className="searchBarBtn" type="submit">
                    <FaSearch />
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Nav Btns */}
          <div className="pageBtnsContainer">
            <button
              className={state.page <= 0 ? "disabledPageBtn" : "pageBtn"}
              disabled={state.page <= 0 ? true : false}
              onClick={() => {
                setState((prevState) => {
                  const newPage = prevState.page - 1;

                  const lastBtn = document.getElementById(
                    "Btn" + (prevState.page + 1)
                  );
                  const newBtn = document.getElementById("Btn" + (newPage + 1));

                  if (lastBtn) lastBtn.className = "pageBtn";
                  if (newBtn) newBtn.className = "selectedPageBtn";

                  return {
                    ...prevState,
                    page: newPage,
                    dogs_to_show: prevState.dogs.slice(
                      newPage * 8,
                      newPage * 8 + 8
                    ),
                  };
                });
                if (state.page <= 1) {
                  setState((prevState) => {
                    return { ...prevState, page: 0 };
                  });
                }
              }}
            >
              {"<"}
            </button>
            {state.pageBtns.map((page) => (
              <button
                className="pageBtn"
                key={page}
                id={"Btn" + page}
                onClick={() => {
                  setState((prevState) => {
                    const newPage = page - 1;

                    const lastBtn = document.getElementById(
                      "Btn" + (prevState.page + 1)
                    );
                    const newBtn = document.getElementById(
                      "Btn" + (newPage + 1)
                    );

                    if (lastBtn) lastBtn.className = "pageBtn";
                    if (newBtn) newBtn.className = "selectedPageBtn";

                    return {
                      ...prevState,
                      page: newPage,
                      dogs_to_show: prevState.dogs.slice(
                        newPage * 8,
                        newPage * 8 + 8
                      ),
                    };
                  });
                }}
              >
                {page}
              </button>
            ))}
            <button
              className={
                pages - 1 <= state.page ? "disabledPageBtn" : "pageBtn"
              }
              disabled={pages - 1 <= state.page ? true : false}
              onClick={() => {
                setState((prevState) => {
                  const newPage = prevState.page + 1;

                  const lastBtn = document.getElementById(
                    "Btn" + (prevState.page + 1)
                  );
                  const newBtn = document.getElementById("Btn" + (newPage + 1));

                  if (lastBtn) lastBtn.className = "pageBtn";
                  if (newBtn) newBtn.className = "selectedPageBtn";

                  return {
                    ...prevState,
                    page: newPage,
                    dogs_to_show: prevState.dogs.slice(
                      newPage * 8,
                      newPage * 8 + 8
                    ),
                  };
                });
                if (state.page >= pages) {
                  setState((prevState) => {
                    return { ...prevState, page: pages };
                  });
                }
              }}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* Show breeds */}
        <div className="dogsToShow">
          {loading ? (
            <Loader />
          ) : (
            <div className="dogsToShow">
              {Array.isArray(state.dogs_to_show) ? (
                state.dogs_to_show.map((dog) => (
                  <Card key={dog.name + dog.id} dog={dog} />
                ))
              ) : (
                <h2 className="favAlert">{state.dogs_to_show}</h2>
              )}
            </div>
          )}
        </div>
        <div className="createBtnContainer">
          <button className="createBtn" onClick={() => navigate("/create")}>
            Add your own
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
