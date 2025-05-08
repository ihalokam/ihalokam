import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import expressSitemap from "express-sitemap";
import path from "path";
import favicon from "serve-favicon";

const app = express();
const port = process.env.PORT || 3000;
const sitemap = expressSitemap();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "public")));
app.use(bodyParser.urlencoded({ extended: true }));
import favicon from "serve-favicon";

// Serve the favicon
app.use(favicon(path.join(process.cwd(), "public", "favicon.ico")));

// Load movie data
const malData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/mal.json"), "utf-8"));
const malMovies = malData.movies;

const telData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/tel.json"), "utf-8"));
const telMovies = telData.movies;

const tamData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/tam.json"), "utf-8"));
const tamMovies = tamData.movies;

const hinData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/hin.json"), "utf-8"));
const hinMovies = hinData.movies;

const kanData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/kann.json"), "utf-8"));
const kanMovies = kanData.movies;

const engData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/eng.json"), "utf-8"));
const engMovies = engData.movies;

// Sitemap route
app.get("/sitemap.xml", (req, res) => {
  sitemap.generate(req, res);
});

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/mal", (req, res) => {
  res.render("partials/movies/mal.ejs", { malMovies });
});

app.get("/tel", (req, res) => {
  res.render("partials/movies/tel.ejs", { telMovies });
});

app.get("/tam", (req, res) => {
  res.render("partials/movies/tamil.ejs", { tamMovies });
});

app.get("/hin", (req, res) => {
  res.render("partials/movies/hindi.ejs", { hinMovies });
});

app.get("/kann", (req, res) => {
  res.render("partials/movies/kann.ejs", { kanMovies });
});

app.get("/eng", (req, res) => {
  res.render("partials/movies/eng.ejs", { engMovies });
});

app.get("/terms-of-service", (req, res) => {
  res.render("partials/terms-of-service.ejs");
});

app.get("/privacy-policy", (req, res) => {
  res.render("partials/privacy-policy.ejs");
});

app.get("/disclaimer", (req, res) => {
  res.render("partials/disclaimer.ejs");
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});