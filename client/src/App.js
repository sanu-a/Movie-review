import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [result, setResult] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/get").then((res) => {
      setResult(res.data);
    });
  }, []);

  const SubmitReview = () => {
    axios.post("http://localhost:8080/api/insert", {
      movieName,
      review,
    });
    setResult([...result, { movie_name: movieName, movie_review: review }]);
  };

  const deleteReview = (movie) => {
    axios.delete(`http://localhost:8080/api/delete/${movie}`);
    const list = result.filter((e) => !(e.movie_name === movie));
    setResult(list);
  };

  const updateReview = (movie) => {
    axios.put("http://localhost:8080/api/update", {
      movie,
      newReview,
    });
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <input
          type="text"
          name="movieName"
          placeholder="Movie Name"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="text"
          name="review"
          placeholder="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={SubmitReview}>Submit</button>
      </div>
      {result.map((e) => (
        <div key={e.id} className="list">
          <h1>
            Movie Name : {e.movie_name} | Review : {e.movie_review}
          </h1>
          <button
            className="btn"
            onClick={() => {
              deleteReview(e.movie_name);
            }}
          >
            Delete
          </button>
          <input
            type="text"
            placeholder="Enter review"
            onChange={(e) => {
              setNewReview(e.target.value);
            }}
          />
          <button
            className="btn"
            onClick={() => {
              updateReview(e.movie_name);
            }}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
