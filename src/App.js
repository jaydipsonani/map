import './App.css';
import MonthYearPicker from './date';
import HoverMap from './hovermap';
import LeafletMap from './map';

function App() {
  return (
    <div className="App">
    <LeafletMap />
    <br/><br/><br/>
    {/* <HoverMap /> */}
    {/* <MonthYearPicker /> */}
    </div>
  );
}

export default App;
