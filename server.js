const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

app.use(cors());

app.get("/proxy", (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  request(url).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server in ascolto sulla porta", port);
});
