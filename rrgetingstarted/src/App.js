import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import "./style2.css";
import ReservationForm from "./ReactForms";
import ChuckNorris from "./ChuckNorris.jsx";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul className="header">
          <Header url="/" linkName="Home" />
          <Header url="/about" linkName="About" />
          <Header url="/dashboard" linkName="Dashboard" />
          <Header url="/reservationform" linkName="Reservation Form" />
          <Header url="/chucknorris" linkName="Chuck Norris" />
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/reservationform">
              <ReservationForm />
            </Route>
            <Route exact path="/chucknorris">
              <ChuckNorris />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Header(props) {
  return (
    <li>
      <NavLink exact activeClassName="selected" to={props.url}>
        {props.linkName}
      </NavLink>
    </li>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
