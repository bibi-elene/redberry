import './App.css';
import Homepage from './components/homepage';
import Form from './components/form';
import Laptop from './components/laptop';
import Success from './components/success';

import logo from './logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/form' element={<Form />} />
      <Route path='/laptop' element={<Laptop />} />
      <Route path='/success' element={<Success />} />
      </Routes>
      </Router>  
    </div>
  );
}

export default App;
