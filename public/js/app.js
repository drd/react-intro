/*  Desired UI:
+--------------------------------------+
|                                      |
|          Portland, Oregon            |
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


Component breakdown:

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
*/

var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


var Title = React.createClass({
  render() {
    return <h1>{this.props.city}</h1>;
  }
});


var Description = React.createClass({
  render() {
    return <h2>{this.props.description}</h2>;
  }
});


var Forecasts = React.createClass({
  render() {
    return <div>
      <h2>Your 7-day forecast:</h2>
      <ul>
        {/* React is really just JavaScript, so we have Array.prototype.map() here */}
        {this.props.forecasts.map(
          // Loop over the forecasts array, using the key property like good children
          // This is a regular comment because we're not in JSX
          forecast => <li key={forecast.day}><Forecast {...forecast}/></li>
        )}
      </ul>
    </div>;
  }
});


var Forecast = React.createClass({
  render() {
    var low = Math.round(this.props.low);
    var high = Math.round(this.props.high);

    return <div>
      {this.props.day}: Low: {low} High: {high}
    </div>;
  }
});


var Application = React.createClass({
  // this is called by React when first instantiating the component
  // the object returned by this will be available as `this.state`
  // in render() and other lifecycle methods
  getInitialState() {
    return {
      city: {
        name: "Portland, OR",
        geo: {
          lat:    45.52,
          long: -122.681
        }
      },
      currentConditions: "", // empty, to be filled in by server
      forecasts: [
                             // empty, to be filled in by server
      ]
    };
  },

  // when a component is first inserted into the document, this lifecycle method is called:
  componentDidMount() {
    // TODO: replace API_KEY with your own: https://developer.forecast.io/
    fetch('https://crossorigin.me/https://api.forecast.io/forecast/API_KEY/45.52,-122.681')
      .then(function(response) {
        return response.json();
      }).then(json => {
        this.setState({
          currentConditions: `${parseInt(json.currently.temperature)}°F, ${json.currently.summary}`,
          forecasts: json.daily.data.slice(0, 7).map(function(day) {
            // construct JS date from time (milliseconds since epoch) and get day index
            var weekday = new Date(day.time * 1e3).getDay();
            return {
              day: DAYS[weekday],
              low: day.temperatureMin,
              high: day.temperatureMax
            };
          })
        });
      }).catch(function(ex) {
        console.error('parsing failed', ex);
      });
  },

  // shh, I'm going to use fancy ES6 object syntax. this is the
  // same as render: function() { .. }
  render() {
    return <div>
      {/* This is the way you write comments in JSX */}
      <Title city={this.state.city.name} />
      <Description description={this.state.currentConditions} />
      {/* You can pass in JavaScript values as properties by enclosing in {} instead of "" */}
      <Forecasts forecasts={this.state.forecasts}/>
    </div>;
  }
});

// ReactDOM is responsible for taking React Components... and putting them into the DOM.
// Find the <div id="content"/> and blat the React components into it:
ReactDOM.render(<Application/>, document.getElementById('content'));
