import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/myorder';

function App() {
  return (
    <CartProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/createuser' element={<Signup/>}/>
            <Route path='/myOrderData' element={<MyOrder/>}/>
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
