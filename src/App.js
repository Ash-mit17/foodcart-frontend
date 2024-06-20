import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/myorder';
import DefaultLayout from './screens/DefaultLayout';

function App() {
  return (
    <CartProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<DefaultLayout><Home/></DefaultLayout>} />
            <Route path='/user/login' element={<DefaultLayout><Login/></DefaultLayout>} />
            <Route path='/user/signup' element={<DefaultLayout><Signup/></DefaultLayout>}/>
            <Route path='/data/myOrderData' element={<DefaultLayout><MyOrder/></DefaultLayout>}/>
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
