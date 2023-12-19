import './App.css'
import './Components/styles/theme.scss'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import ForgetPassword from './Components/Pages/authentication/forget-password';
import SignUp from './Components/Pages/authentication/sign-up';
import SignIn from './Components/Pages/authentication/sign-in';
import Error404 from './Components/Pages/nfound';
import Home from './Components/Pages/dashboard/home';
import Landingpage from './Components/Pages/lpage';
import Gallery from './Components/Pages/dashboard/gallery';
import Myuploads from './Components/Pages/dashboard/myuploads';
import Uploadfile from './Components/Pages/dashboard/uploadfile';
import Profile from './Components/Pages/dashboard/profile';
import NewPassword from './Components/Pages/authentication/new-password';





export default function App() {
  return (
      <Routes>
          <Route exact path='/' element={<Landingpage/>}/>
          <Route  path="/forget-password" element={<ForgetPassword />} />
          <Route  path="/signup" element={<SignUp />} />
          <Route  path="/admin" element={<Home />} />
          <Route  path="/upload-new" element={<Uploadfile />} />
          <Route path='/profile' element={<Profile />} />
          <Route  path="/gallery" element={<Gallery />} />
          <Route path="/forget" element={<NewPassword/>}/>
          <Route  path="/private-uploads" element={<Myuploads />} />
          <Route  path="/signin" element={<SignIn />} />
          <Route  path="*" element={< Error404/>} />
        
      </Routes> 
      
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



