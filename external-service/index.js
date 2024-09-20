// external service hosted on cloud run cluster
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8081;

// Apply CORS middleware globally for all routes
app.use(cors());

// Apply body parser middleware for parsing URL-encoded bodies and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const response = {
    message: "Hello, World!",
    timestamp: new Date(),
  };

  res.json(response);
});

app.post("/forward", async (req, res) => {
  console.log(req.body);
  const { callbackUrl, uuid } = req.body;
  const response = await fetch(callbackUrl, {
    method: "POST",
    body: {
      uuid,
    },
    headers: {
      "Content-type": "text/html; charset=UTF-8",
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }
  res.status(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
