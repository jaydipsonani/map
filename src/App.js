import './App.css';
import MonthYearPicker from './date';
import HoverMap from './hovermap';
import LeafletMap from './map';
import CountrySearch from './search';

function App() {
  return (
    <div className="App">
    <LeafletMap />
    <br/><br/><br/>
    {/* <HoverMap /> */}
    {/* <MonthYearPicker /> */}
    {/* <CountrySearch /> */}
    </div>
  );
}

export default App;
