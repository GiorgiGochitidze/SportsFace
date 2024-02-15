// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './Components/Registration';
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/Home/:userName/:surName' element={<Home />} />
        <Route path='/LogIn' element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
