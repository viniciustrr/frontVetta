import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route , Routes} from 'react-router-dom';
import RegisterPage from './Pages/register/register-page';
import ViewPage from './Pages/view/view-component';

function App() {
  return (
    <div>
    <Routes>
      <Route  exact path = '/' element = {<RegisterPage/>}/>
      <Route  exact path = '/view' element = {<ViewPage/>}/>
    </Routes>       
  </div>
  );
}

export default App;
