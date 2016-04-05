// require the express library
var express = require('express');

// create an instance of an express server
var app = express();
// tell the server to serve static files out of a directory named 'public'
app.use(express.static('public'));

// bind to port 3000 and start serving requests
app.listen(3000, function(err) {
  if (err) {
    // woops there was an error, maybe something else is using port :3000?
    // unixy pro-tip: in bash, `lsof -i :3000`
    console.error("Error starting express server", err);
    // bail
    process.exit(1);
  }
  // announce our great success
  console.log("Listening on http://localhost:3000");
});
