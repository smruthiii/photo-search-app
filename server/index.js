const { createClient } = require('pexels')
const express = require("express");
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.API_KEY;
console.log(API_KEY)

const app = express();
// const client = createClient('563492ad6f9170000100000123ece47e2acd4c8e9bda08e530fdbb3d')
// const client = createClient(API_KEY)

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/curatedPics", (req,res) => {
    client.photos.curated({per_page: req.query.per_page, page: req.query.page}).then(photos => {
        res.send(photos)
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});