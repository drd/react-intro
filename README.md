# react-intro

Welcome to React! This project leads you through the creation of a (very) simple
React application that queries the forecast.io API for weather.

## how to use it

The lessons in this application are set up in issues and pull requests in the
GitHub repo. I don't know if that will work well but I've had the idea and now
I'm going to try it! Congratulations lucky winners.

## lessons

### lesson 0

Design first! This README is lesson 0.

### lesson 1: Set up a `package.json` and install some dependencies.

When you want to write some JavaScript, a good way to run it is to use [Node.js](http://nodejs.org). Also, a good way to get other people's JavaScript is to use [npm (Node Package Manager](https://www.npmjs.com/). By installing Node.js, you will have access to both. I'll wait here and drink some coffee or whisky depending on what time of day it is.

Now that you have the Power of JavaScript at your fingertips, it's time to turn this into a real, honest-to-goodness JavaScript project. And the way we do that, friends? `npm init .`

`npm init` will ask you a bunch of questions. Many of them have lovely defaults and you can simply press your enter key. You may desire to wax eloquently in the description field, and provide a "Your Name <your@email.address>" response to the author field. Licensing questions are strictly out of scope.

What do you get from `npm init`? I said you get a JavaScript project, but concretely you get a `package.json` file. This file sits at the root of your project, and is used by `npm` in many ways. One of the nicest ways it is used is to track the dependencies of your project. Let's get things rolling and install other people's code right now!

We're making a web site (you can call it an application if you prefer) so something that is useful when making one is a web server. There's one called [express](http://expressjs.com/) which we'll use. Here's how you install it:

`npm install express --save`

This tells `npm` to go get express and all of its dependencies, and install them into the `node_modules` directory of the project. The `--save` bit will update the `package.json` file and record the fact that our project depends on express to work.

Once you've run that we'll be all set to actually start making a web site/application/etc.

### lesson 2: Start to serve a simple HTML page with expressjs.

Serving a static html file with Express is quite simple, because Express ships with a builtin static middleware which will serve files out of the `/public` directory.

---

*NOISE OF RECORD NEEDLE SCRATCHING, EVERYONE AT PARTY STOPS TALKING*

What on Earth is a middleware? (What do you wear in Middle Earth? Nevermind.) A middleware is essentially just a function that modifies how Express responds to an http request. In this case, it's looking for requests that match files living your `/public` directory and serving them up for you.

*OH OKAY COOL GUYS LETS KEEP THIS PARTY GOING!*

---

How do you set up Express? First, let's create a file called `server.js` and stick some JavaScript in it.

```js
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
```

Ok great! We have a web server. But if you visit that address, you will see "Cannot GET /". We need to make a public directory and write an index.html file!

```bash
mkdir public
touch index.html
```

And, for our index.html file:

```html
<!doctype html>
<html>
  <head>
    <title>React Intro: Your New 24 Hour Weather Source</title>
  </head>
  <body>
    <h1>React Intro: Coming soon: React.</h1>
  </body>
</html>
```

And with that, Lesson 2 is essentially complete! However, there's one more trick up our sleeves. One nice thing that `package.json` can do is specify scripts to run. By convention, there's one called `npm start`. So, if we edit the `scripts` key in `package.json` like so, we will be able to run our web server like all the cool* kids:

```json
{
  ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  }
  ...
}
```

(The "test" script is there, wagging its finger at us, reminding us that it's always good to write tests. For now, we'll ignore it.)

### lesson 3

Write the simple React components that structure the application UI.

### lesson 4

Fetch data from forecast.io to show Portland, OR's (surprisingly nice) weather
(at the time of writing).

### lesson 5

Use geocoding API from datasciencetoolkit.org to allow multiple cities to be
entered by the user, showing form input and iteration.

### lesson 6

Go forth and React!
