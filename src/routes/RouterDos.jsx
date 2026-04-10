import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";

const RouterDos = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
    </Routes>
  );
};

export default RouterDos;
