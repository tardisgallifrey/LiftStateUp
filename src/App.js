import './App.css';
import {Calculator, Calculator2} from './Calculator';

function App() {
  return (
    <div className="App">
    <div className="App-fixed"><p>Just an example of what Reactjs can do.  A demo UI app.</p></div>
      <h1>Would the Water Boil?</h1>
      <Calculator />
      <p>Same Component, but with Temperature choice, synchronized by Lifting State up to Calculator2 Component</p>
      <Calculator2 />
      
      </div>
    
  );
}

export default App;
