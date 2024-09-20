// proxy service hosted on GKE cluster
const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  const response = {
    message: "Hello, World!",
    timestamp: new Date(),
  };

  res.json(response);
});

app.post("/send", async (req, res) => {
  const response = await fetch("call forward endpoint of external service", {
    method: "POST",
    body: "hello",
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

app.get("/callback", (req, res) => {
  res.status(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
