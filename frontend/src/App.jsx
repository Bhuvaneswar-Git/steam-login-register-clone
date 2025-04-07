import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/landingpage/LandingPage';
import Login from './pages/login/Login';
import RegisterPage from './pages/registerPage/RegisterPage';
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {

  return (
      <Router>
          <Routes>
              <Route path='/' element={<LandingPage/>} />
              <Route path='/auth/login' element={<Login/>} />
              <Route path='/auth/register' element={<RegisterPage/>} />
              <Route path='/home' element={<Home/>} />
          </Routes>
                <ToastContainer position="top-center" autoClose={3000} />
      </Router>

  )
}

export default App
