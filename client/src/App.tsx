import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AuthContext from '../context/AuthContext';
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {

  const { authUser } = useContext(AuthContext);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;