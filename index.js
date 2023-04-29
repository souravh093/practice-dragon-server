const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

const categories = require("./data/categories.json");
const news = require("./data/news.json");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.get("/news", (req, res) => {
  res.send(news);
});

app.get("/news/:id", (req, res) => {
    const id = req.params.id;
    const selectedId = news.find(n => n._id === id)
    res.send(selectedId);
})

app.get("/categories/:id", (req, res) => {
  const id = req.params.id;
  if (parseFloat(id) === 0) {
    res.send(news);
  } else {
    const categoriesNews = news.filter((n) => n.category_id === id);
    res.send(categoriesNews);
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
