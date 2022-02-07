const { createClient } = require('pexels')
const express = require("express");
const PORT = process.env.PORT || 3001;
const APIKEY = process.env.APIKEY;
console.log(APIKEY)

const app = express();
const client = createClient(APIKEY)

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


app.get("/searchPics", (req,res) => {
  let query = req.query.searchString
  let page = req.query.page
  client.photos.search({ query, per_page: 10, page }).then(photos => {
      res.send(photos)
  })
  
 
})

app.get("/curatedPics", (req,res) => {
    client.photos.curated({per_page: req.query.per_page, page: req.query.page}).then(photos => {
        res.send(photos)
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});