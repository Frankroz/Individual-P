import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Create from "./components/Create/Create";
import NoPage from "./components/NoPage/NoPage";
import About from "./components/About/About";
import { connect } from "react-redux";
import { getDogs, getTempers } from "./store/actions";
import React from "react";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Favorites from "./components/Favorites/Favorites";

class App extends React.Component {
  componentDidMount() {
    this.props.getDogs();
    this.props.getTempers();
  }

  render() {
    return (
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/dog/:id" exact element={<Details />} />
        <Route path="/create" exact element={<Create />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/favorites" exact element={<Favorites />} />
        <Route path="*" exact element={<NoPage />} />
      </Routes>
    );
  }
}

export default connect(null, { getDogs, getTempers })(App);
