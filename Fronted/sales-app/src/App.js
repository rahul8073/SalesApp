
import AddSales from './pages/AddSales';
import Top_5 from './pages/top_5';
import Total_revenue from './pages/total_revenue';
import Login from './pages/login';
import Registration from './pages/registration';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    //use route in react router dom components
    <BrowserRouter>
    
      <Routes> 
        <Route path='/addsales' element={<AddSales/>}/> 
        <Route path='/top5' element={<Top_5/>}/> 
        <Route path='/totalRevenue' element={<Total_revenue/>}/> 
        <Route path='/home' element={<Home/>}/> 
        <Route path='/' element={<Login/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/registration' element={<Registration/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
