import { 
  BrowserRouter as Router, 
  Route, 
  Routes, 
  useNavigate 
} from 'react-router-dom';

import Home from './pages/Home.page.jsx';
import Login from './pages/Login.page.jsx';
import Preference from './pages/Prefrences.page.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login navigate={useNavigate}/> }></Route>
        <Route path='/home' element={ <Home navigate={useNavigate}/> }></Route>
        <Route path='/preference' element={ <Preference navigate={useNavigate}/> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
