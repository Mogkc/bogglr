const http = require('http');
const express = require('express');
const virtualBoard = require("./models/virtualBoard");
const dictionary = require("./models/dictionary")

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/board/:rows/:cols", (req, res) => {
    res.json(
        virtualBoard.generate(req.params.rows, req.params.cols)
    );
});

app.get("/api/dictionary", (req, res) => {
    res.json(dictionary);
});

const PORT = process.env.PORT || 3001;
const server = http.Server(app);

server.listen(PORT, function () {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});