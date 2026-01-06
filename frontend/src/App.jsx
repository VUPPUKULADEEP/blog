import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
