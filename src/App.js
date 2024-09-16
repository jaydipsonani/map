import './App.css';
import HoverMap from './hovermap';
import LeafletMap from './map';

function App() {
  return (
    <div className="App">
    <LeafletMap />
    <br/><br/><br/>
    <HoverMap />
    </div>
  );
}

export default App;
