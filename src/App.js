//import logo from './logo.svg';
//import './App.css';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import FarmerForm from './FarmerForm';
import FarmerDisplay from './FarmerDisplay';
import SingleFarmerDisplay from './SingleFarmerDisplay';
import SingleFarmerSearch from './SingleFarmerSearch';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import React, { useEffect } from "react";
import AddFarmProduct from './AddFarmProduct';
import axios from "axios";
import Cookies from "js-cookie";
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import GetCropDetails from './GetCropDetails';
import UpdateFarmProduct from './UpdateFarmProduct'
function App() {

  useEffect(() => {
    // Fetch CSRF token from the server and set it as a cookie
    axios.get("/csrf-token").then((response) => {
      const csrfToken = response.data.token;
      Cookies.set("XSRF-TOKEN", csrfToken);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/upload' element={<FarmerForm/>} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/resetpassword/:token' element={<ResetPassword/>} />
        <Route path="/display" element={<FarmerDisplay/>}/>
        <Route path="/search" element={<SingleFarmerSearch/>}/>
        <Route path='/singleDisplay/:name' element={<SingleFarmerDisplay/>}/>
        <Route path='/signup' element={<SignupForm/>}></Route>
    <Route path='/signin' element={<SigninForm/>}></Route>
    <Route path='/addcrop' element={<AddFarmProduct/>}></Route>
    <Route path='/getcroplist' element={<GetCropDetails/>}></Route>
    <Route path='/editCrop/:cropId' element={<UpdateFarmProduct/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

