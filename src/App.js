import "./App.css";
import { Routes, Route } from "react-router-dom"
import { Login, Signup, Home } from "./features";
import { Navbar } from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/home" element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;
