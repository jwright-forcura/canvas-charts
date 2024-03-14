import './App.css';
import PieChart from './Charts/PieChart';
import Thermometer from './Charts/Thermometer';

const data = [
  {
    label: "this is red",
    count: 9,
    color: "red"
  },
  {
    label: "this is blue",
    count: 23,
    color: "blue"
  },
  {
    count: 15,
    color: "green"
  }
]
function App() {
  return (
    <div className="App">
      <PieChart data={data} width={200} height={200} radius={75} lineWidth={15} fontSize={30}/>
      <Thermometer data={data} width={200} height={200} radius={75} lineWidth={15} fontSize={30}/>
    </div>
  );
}

export default App;
