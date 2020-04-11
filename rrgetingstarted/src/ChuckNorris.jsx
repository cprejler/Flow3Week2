import React, { useState, useEffect } from "react";

import axios from "axios";

function ChuckNorris() {
  const [joke, setJoke] = useState("");
  const [count, setCount] = useState(0);
  const [dadJoke, setDadJoke] = useState(0);

  function getDadJoke() {
    let options = {
      headers: {
        Accept: "application/json"
      }
    };
    fetch("https://icanhazdadjoke.com/api", options)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        setJoke(data.joke);
      });
  }
  setTimeout(getDadJoke(), 15000);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random"
      );
      setJoke(response.data);
    }
    getData();
  }, [count]);
  return (
    <div>
      <h1>Click button to get a Chuck Norris Joke</h1>
      <button onClick={() => setCount(count + 1)}>Get Joke</button>

      <p>{joke.value}</p>
      <p>{dadJoke}</p>
    </div>
  );
}

export default ChuckNorris;
