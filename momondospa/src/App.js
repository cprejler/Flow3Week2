import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import facade from "./apiFacade";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function MomondoSPA() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then(res => setLoggedIn(true));
  };
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/jokes">
              Jokes
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/scrape">
              Scrape
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/login">
              Login
            </NavLink>
          </li>
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
            <Route path="/jokes">
              <Jokes />
            </Route>
            <Route path="/scrape">
              <Scraper />
            </Route>
            <Route exact path="/login">
              {!loggedIn ? (
                <LogIn login={login} />
              ) : (
                <div>
                  <LoggedIn />
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </Route>
          </Switch>
        </div>
      </div>
      <div></div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = evt => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = evt => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData().then(data => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Jokes() {
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = fetch("http://localhost:8080/sp7backend/api/jokes")
  //     .then(res => res.json())
  //     .then(data => setData(data))
  //     .catch(err => console.log("UPPS"));
  // }, {});
  const data = facade.fetchJoke();
  return (
    <div>
      <h2>These are some funny jokes:</h2>
      <div>
        <p>
          <b>Dad joke:</b> {data.dadJoke}
        </p>
        <p>
          <b>Reference:</b> {data.dadJokeRef}
        </p>
        <p>
          <b>Chuck Norris Joke:</b> {data.chuckJoke}
        </p>
        <p>
          <b>Reference:</b> {data.chuckJokeRef}
        </p>
      </div>
    </div>
  );
}

function Scraper() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = fetch("http://localhost:8080/sp7backend/api/scrape")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log("UPPS"));
  }, []);

  const tabledata = data.map(data => {
    return (
      <tr>
        <td>{data.title}</td>
        <td>{data.url}</td>
        <td>{data.divCount}</td>
      </tr>
    );
  });
  return (
    <div>
      <h2>DIV Stats: </h2>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Website</th>
              <th>URL</th>
              <th>DIV Amount</th>
            </tr>
          </thead>

          <tbody>{tabledata}</tbody>
        </table>
      </div>
    </div>
  );
}
