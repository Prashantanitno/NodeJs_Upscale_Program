const http = require("http");

const port = 5000;

const httpServer = http.createServer((req, res) => {
  if ((req.url === "/")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello!..  Home page  ");
  }
  if ((req.url === "/about")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello!..  About page  ");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Error  Page   ");
  }
});

httpServer.listen(port, () => {
  console.log(`Server is running on ${port} `);
});
