import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink
} from "react-router-dom";

import "./App.css";
import { useState } from "react";

function App(props) {
  const { bookFacade } = props;
  return (
    <div className="App">
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products bookFacade={bookFacade} />
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/add-book">
            <AddBook bookFacade={bookFacade} />
          </Route>
          <Route path="/find-book">
            <FindBook bookFacade={bookFacade} />
          </Route>
          <Route path="/components">
            <Details bookFacade={bookFacade} />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/add-book">
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/find-book">
            Find Book
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/company">
            Company
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();

  let books = bookFacade.getBooks();
  const bookItems = books.map(book => {
    return (
      <li key={book.id}>
        {book.title}
        <Link to={`${url}/${book.id}`}>Details</Link>
      </li>
    );
  });
  return (
    <div>
      <h1>Products</h1>
      <ul>{bookItems}</ul>
      <div>
        <Route path={`${path}/:bookID`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </div>
    </div>
  );
}

function Company() {
  return (
    <div>
      <h1>Company</h1>
    </div>
  );
}

function AddBook({ bookFacade }) {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleInfoChange(event) {
    setInfo(event.target.value);
  }

  return (
    <div>
      <h1>Add Book</h1>
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            bookFacade.addBook({ title }, { info });
            event.target.reset();
          }}
        >
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Add title"
          ></input>
          <br></br>
          <input
            type="text"
            value={info}
            onChange={handleInfoChange}
            placeholder="Add info"
          ></input>
          <br></br>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

function Details({ bookFacade }) {
  let { id } = useParams();
  const book = bookFacade.findBook({ id });
  return (
    <div>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <p>Info: {book.info}</p>
    </div>
  );
}

function FindBook({ bookFacade }) {
  const [id, setID] = useState("");
  const [book, setBook] = useState({ title: "", info: "" });

  function handleChange(event) {
    setID(event.target.value);
  }

  function findBook({ id }) {
    const book = bookFacade.findBook({ id });
    setBook(book);
  }
  return (
    <div>
      <h1>Find a book:</h1>

      <input
        type="text"
        value={id}
        onChange={handleChange}
        placeholder="Enter book id"
      ></input>
      <button onClick={findBook}>Find</button>
      <p>
        ID: {book.id}
        Title: {book.title}
        Info: {book.info}
      </p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>No match</h1>
    </div>
  );
}

export default App;
