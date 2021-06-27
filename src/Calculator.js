import React from 'react';
import {BoilingVerdict} from './BoilingVerdict';

export class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {temperature: '37'};
    }
  
    handleChange(e) {
      this.setState({temperature: e.target.value});
    }
  
    render() {
      const temperature = this.state.temperature;
      return (
        <div className="App-special">
        <fieldset>
          <legend>Enter temperature in Celsius:</legend>
          <input value={temperature} onChange={this.handleChange} />
          
        </fieldset>
        <BoilingVerdict celsius={parseFloat(temperature)} />
        </div>
      );
    }
  }

  //extract the Celsius as a property so we can have both C and F
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };

  //Temperature conversion functions
  function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  //Try to convert as long as there is no error
  //returns empty string on error
  function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);

    //If input is Not a Number, return empty string
    if (Number.isNaN(input)) {
      return '';
    }

    //Call convert function
    const output = convert(input);

    //Round off to three decimal places
    const rounded = Math.round(output * 1000) / 1000;

    //Convert it back to a string for HTML
    return rounded.toString();
  }
  
  //Extract Temperature input value as its own component
  //For shared state (LiftingStateUp) Temperature Input now
  //gets the temp value as a prop (read only)
  //It can no longer change the temp value on its own
  class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    //Calculator2 will be in charge
    //If temp value changes, TemperatureInput activates
    handleChange(e) {
      this.props.onTemperatureChange(e.target.value);
    }
  
    render() {
      const temperature = this.props.temperature;
      const scale = this.props.scale;
      return (
        <div className="App-special">
        <fieldset className="App">
          <legend>Enter temperature in {scaleNames[scale]}:</legend>
          <input value={temperature}
                 onChange={this.handleChange} />
        </fieldset>
        </div>
      );
    }
  }
  

  export class Calculator2 extends React.Component {
    constructor(props) {
      super(props);
      this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
      this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
      this.state = {temperature: '', scale: 'c'};
    }
  
    handleCelsiusChange(temperature) {
      this.setState({scale: 'c', temperature});
    }
  
    handleFahrenheitChange(temperature) {
      this.setState({scale: 'f', temperature});
    }
  
    render() {
      const scale = this.state.scale;
      const temperature = this.state.temperature;

      //e.g. if scale is exactly equal to 'f', the try to convert else use temperature
      const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
      const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

      //We still only send the variable 'celsius' to BoilingVerdict
  
      return (
        <div>
          <TemperatureInput
            scale="c"
            temperature={celsius}
            onTemperatureChange={this.handleCelsiusChange} />

          <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            onTemperatureChange={this.handleFahrenheitChange} />

          <BoilingVerdict
            celsius={parseFloat(celsius)} />
        </div>
      );
    }
  }

//Note from Reactjs.org
  /* If something can be derived from either props or state, 
  it probably shouldn’t be in the state. 
  For example, instead of storing both celsiusValue and fahrenheitValue, 
  we store just the last edited temperature and its scale. 
  The value of the other input can always be calculated from them in the render() method. 
  This lets us clear or apply rounding to the other field without losing any precision in the user input.*/