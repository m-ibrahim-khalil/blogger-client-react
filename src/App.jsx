import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import Signin from "./components/accounts/Signin";
import Signup from "./components/accounts/Signup";
import MenuAppBar from "./components/layouts/Appbar/AppBar";

function App() {

  return (
    <>
    <MenuAppBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
