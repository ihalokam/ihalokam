import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import expressSitemap from "express-sitemap";
import path from "path";
import favicon from "serve-favicon";

const app = express();
const port = process.env.PORT || 3000;

// Configure sitemap
const sitemap = expressSitemap({
  map: {
    "/": ["get"],
    "/mal": ["get"],
    "/tel": ["get"],
    "/tam": ["get"],
    "/hin": ["get"],
    "/kann": ["get"],
    "/eng": ["get"],
    "/terms-of-service": ["get"],
    "/privacy-policy": ["get"],
    "/disclaimer": ["get"],
  },
  route: {
    "/": {
      lastmod: "2025-05-08",
      changefreq: "daily",
      priority: 1.0,
    },
    "/mal": {
      lastmod: "2025-05-08",
      changefreq: "weekly",
      priority: 0.8,
    },
    "/tel": {
      lastmod: "2025-05-08",
      changefreq: "weekly",
      priority: 0.8,
    },
    "/tam": {
      lastmod: "2025-05-08",
      changefreq: "weekly",
      priority: 0.8,
    },
    "/hin": {
      lastmod: "2025-05-08",
      changefreq: "weekly",
      priority: 0.8,
    },
    "/kann": {
      lastmod: "2025-05-08",
      changefreq: "weekly",
      priority: 0.8,
    },
    "/eng": {
      lastmod: "2025-05-08",
      changefreq: "weekly",
      priority: 0.8,
    },
    "/terms-of-service": {
      lastmod: "2025-05-08",
      changefreq: "yearly",
      priority: 0.5,
    },
    "/privacy-policy": {
      lastmod: "2025-05-08",
      changefreq: "yearly",
      priority: 0.5,
    },
    "/disclaimer": {
      lastmod: "2025-05-08",
      changefreq: "yearly",
      priority: 0.5,
    },
  },
}, app); // Pass the Express app instance here
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the favicon
app.use(favicon(path.join(process.cwd(), "public", "favicon.ico")));

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