import './App.css';
import Homepage from './components/homepage';
import FileForm from './components/form';
import Laptop from './components/laptop';
import Success from './components/success';
import Employee from './components/employee';
import List from './components/list'
import Details from './components/details'

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
      <Route path='/redberry/form' element={<FileForm />} />
      <Route path='/redberry/employee' element={<Employee />} />
      <Route path='/redberry/laptop' element={<Laptop />} />
      <Route path='/redberry/success' element={<Success />} />
      <Route path='/redberry/list' element={<List />} />
      <Route exact path="/:id" element={<Details />} /> 
      </Routes>
      </Router>  
    </div>
  );
}

export default App;
