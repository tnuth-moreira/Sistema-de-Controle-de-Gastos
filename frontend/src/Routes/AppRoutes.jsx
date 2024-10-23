import { Route, Routes } from "react-router-dom";
import Cadastro from "../Pages/Cadastro";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ModalAddRegister from "../components/ModalAddRegister";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/add-register" element={<ModalAddRegister />} />
    </Routes>
  );
}

export default AppRoutes;
