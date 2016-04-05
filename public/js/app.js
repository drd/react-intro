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
    return <div>
      {this.props.day}: {this.props.forecast}
    </div>;
  }
});


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

// ReactDOM is responsible for taking React Components... and putting them into the DOM.
// Find the <div id="content"/> and blat the React components into it:
ReactDOM.render(<Application/>, document.getElementById('content'));
