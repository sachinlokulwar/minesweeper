import logo from './logo.svg';
import './App.css';
import Header from './Components/Headed';
import Minesweeper from './Components/Minesweeper';

function App() {
  return (
    <div className="App">
      <h1>
      Minesweeper
      </h1>
      <Header />
      <Minesweeper />
    </div>
  );
}

export default App;
