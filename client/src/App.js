import { 
  BrowserRouter as Router, 
  Route, 
  Routes, 
  useNavigate, 
} from 'react-router-dom';

import Home from './pages/Home.page.jsx';
import Login from './pages/Login.page.jsx';
import Preference from './pages/Prefrences.page.jsx';
import ActionAreaCard from './pages/Profile.page.jsx';
import AddTask from './pages/AddTask.page.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login navigate={useNavigate}/> }></Route>
        <Route path='/home' element={ <Home navigate={useNavigate}/> }></Route>
        <Route path='/preference' element={ <Preference navigate={useNavigate}/> }></Route>
        <Route path='/profile' element={<ActionAreaCard navigate={useNavigate}/>} />
        <Route path='/add-memory' element={<AddTask navigate={useNavigate}/>} />
      </Routes>
    </Router>
  );
}

export default App;
