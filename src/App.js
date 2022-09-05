import './App.css';
import Homepage from './components/homepage';
import FileForm from './components/form';
import Laptop from './components/laptop';
import Success from './components/success';
import Employee from './components/employee';
import List from './components/list'
import Details from './components/details'


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
      <Route path='/redberry' element={<Homepage />} />
      <Route path='/form' element={<FileForm />} />
      <Route path='/employee' element={<Employee />} />
      <Route path='/laptop' element={<Laptop />} />
      <Route path='/success' element={<Success />} />
      <Route path='/list' element={<List />} />
      <Route exact path="/:id" element={<Details />} /> 
      </Routes>
      </Router>  
    </div>
  );
}

export default App;
