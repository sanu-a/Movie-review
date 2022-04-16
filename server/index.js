const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Sanua*123",
  database: "crud_database",
});

app.get("/api/get", (req, res) => {
  const query = "select * from movie_reviews";
  db.query(query, (err, result) => {
    if (err) console.log(err);
    res.status(200).send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const review = req.body.review;
  const query =
    "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?, ?);";
  db.query(query, [movieName, review], (err, result) => {
    if (err) console.log(err);
  });
  res.status(200).send("inserted succesfully");
});

app.delete("/api/delete/:movieName", (req, res) => {
  const movieName = req.params.movieName;
  const query = "delete from movie_reviews where movie_name=?";
  db.query(query, movieName, (err) => {
    if (err) console.log(err);
  });
  res.status(200).send("deleted succesfully");
});

app.put("/api/update", (req, res) => {
  const movieName = req.body.movie;
  const newReview = req.body.newReview;
  const query = "update movie_reviews set movie_review=? where movie_name=?";
  db.query(query, [newReview, movieName], (err, result) => {
    if (err) console.log(err);
    // console.log(result);
  });
  res.status(200).send("updatedd succesfully");
});

app.listen(8080, () => console.log("server started on 8080"));
