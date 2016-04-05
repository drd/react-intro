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

### lesson 3: Write the simple React components that structure the application UI.

It's like we're finally getting to the good stuff! Ok that other stuff was pretty great but we're on the third lesson and we haven't done anything with React yet! It's time.

Depending on how much you already know about React and the ecosystem around it, there's a lot (and I mean A LOT) of discussion about how to best structure React applications and which tools you should use to build them. For now, we're going to step around that proverbial mud puddle and go the simple way, lifted from the [official React tutorial](https://facebook.github.io/react/docs/getting-started.html#quick-start-without-npm) with minimal modifications. This sets up our `public/index.html` file to include the React libraries and a browser-based compiler that will let you use the JSX syntax without any additional tools:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Tutorial</title>
    <!-- Not present in the tutorial. Just for basic styling. -->
    <link rel="stylesheet" href="css/base.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.16/browser.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <script type="text/babel">
      // We're going to put some React code RIGHT HERE!
    </script>
  </body>
</html>
```

> How does it work? The browser version of babel will look for all `<script>` tags marked with a type of `text/babel` and process them before the browser tries to run them. Nifty, eh?

So… It's time to start writing React. React is a library for making user interfaces. What user interface should we build? Let's start out by building a static weather card for Portland, OR. Something like this:

```
+--------------------------------------+
|                                      |
|         Portland, Oregon             |
|                                      |
|      If it's not Summer, it's        |
|  probably 45°F and raining lightly   |
|                                      |
|           7-day forecast             |
|    Wed: 45°F and raining lightly     |
|    Thu: 45°F and raining lightly     |
|    Fri: 45°F and raining lightly     |
|    Sat: 45°F and raining lightly     |
|    Sun: 45°F and raining lightly     |
|    Mon: 45°F and raining lightly     |
|    Tue: 45°F and raining lightly     |
|                                      |
+--------------------------------------+
```

Let's break that down into Components!

```
           Application Component
+--------------------------------------+
| +----------------------------------+ |
| |           Title Component        | |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| |        Description Component     | |
| +----------------------------------+ |
|                                      |
| +----------------------------------+ |
| |        Forecasts Component       | |
| | +------------------------------+ | |
| | |       Forecast Component     | | |
| | +------------------------------+ | |
| | |       Forecast Component     | | |
| | +------------------------------+ | |
| | |               ...            | | |
| | +------------------------------+ | |
| +----------------------------------+ |
+--------------------------------------+
```

Now we have an idea of what we're building. Let's start turning these into code:

```js
var Title = React.createClass({
  // shh, I'm going to use fancy ES6 object syntax. this is the
  // same as render: function() { .. }
  render() {
    return <h1>{this.props.city}</h1>;
  }
})
```

Here we have created a React class called `Title`. It has one method, `render`, which is the minimum definition of a valid React component. This method returns… HTML? What the heck? Ok it's JSX. If you wanted to, you could have written this as:

```js
var Title = React.createClass({
  render() {
    return React.createElement('h1', {}, this.props.city);
  }
})
```

Not too bad, but it gets cumbersome with time. Importantly, however, this is how React creates its representation of the Virtual DOM. In this case, that will consist of

```js
React.createElement(
  'h1', // an <h1> tag
  {},   // with no properties
  this.props.city // containing one child, the value of this.props.city
)
```

Here are some more simple classes, the `Description` and `Forecast` components:

```js
var Description = React.createClass({
  render() {
    return <h2>{this.props.description}</h2>;
  }
});

var Forecast = React.createClass({
  render() {
    return <div>
      {this.props.day}: {this.props.forecast}
    </div>;
  }
});
```

Things start to get trickier, though, with the `Forecasts` component:

```js
var Forecasts = React.createClass({
  render() {
    return <div>
      <h2>Your 7-day forecast:</h2>
      <ul>
        {/* React is really just JavaScript, so we have Array.prototype.map() here */}
        {this.props.forecasts.map(
          // Loop over the forecasts array, using the key property like good children
          // Note this is a regular comment because we're not in a JSX element
          forecast => <li key={forecast.day}><Forecast {...forecast}/></li>
        )}
      </ul>
    </div>;
  }
});
```

Because React is just JavaScript, and we are being passed an array of forecasts for the upcoming week, we can just use `Array.prototype.map()` to transform the forecast *data* into forecast *UI*: this is the essence of what makes React so cool! Each element in the forecast array is turned into a `<Forecast>` component that will represent it in the DOM. :sparkles:

> The `key` property, referenced in the cheeky comment above, helps React when it's updating the actual DOM from its virtual DOM. Maybe don't worry about it too much, but the key point here is that we have an array of child components, and React uses the key to distinguish amongst them.

Now that we have all the pieces, let's put them together:

```js
var Application = React.createClass({
  // shh, I'm going to use fancy ES6 object syntax. this is the
  // same as render: function() { .. }
  render() {
    return <div>
      {/* This is the way you write comments in JSX */}
      <Title city="Portland, OR" />
      <Description description="If it's not Summer, it's probably 45°F and raining lightly" />
      {/* You can pass in JavaScript values as properties by enclosing in {} instead of "" */}
      <Forecasts forecasts={[
        {day: 'Wed', forecast: '45°F and raining lightly'},
        {day: 'Thu', forecast: '45°F and raining lightly'},
        {day: 'Fri', forecast: '45°F and raining lightly'},
        {day: 'Sat', forecast: '45°F and raining lightly'},
        {day: 'Sun', forecast: '45°F and raining lightly'},
        {day: 'Mon', forecast: '45°F and raining lightly'},
        {day: 'Tue', forecast: '45°F and raining lightly'},
      ]}/>
    </div>;
  }
});
```

All that's left is put our application into the DOM:

```js
// ReactDOM is responsible for taking React Components... and putting them into the DOM.
// Find the <div id="content"/> and blat the React components into it:
ReactDOM.render(<Application/>, document.getElementById('content'));
```

### lesson 4

Fetch data from forecast.io to show Portland, OR's (surprisingly nice) weather
(at the time of writing).

### lesson 5

Use geocoding API from datasciencetoolkit.org to allow multiple cities to be
entered by the user, showing form input and iteration.

### lesson 6

Go forth and React!
