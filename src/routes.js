import React from "react";
import { Routes, Route } from "react-router-dom";

import StaffMenu from "./pages/staff-menu";
import Concessionarias from "./pages/concessionarias";
import CadUser from "./pages/cadastro-user";
import CadStaff from "./pages/cadastro-staff";
import Orcamento from "./pages/orcamento";
import Propostas from "./pages/propostas";
import Pdfgen from "./components/pdf-gen";
import Materiais from "./pages/materiais";
import Servicos from "./pages/servicos";
import ServicosMateriais from "./pages/materiaisServicos";
import Clientes from "./pages/clientes";
import Cliente from "./pages/clientes/components/viewcliente";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/staff-menu" element={<StaffMenu />} />
      <Route path="/concessionarias" element={<Concessionarias />} />
      <Route path="/cadastro" element={<CadUser />} />
      <Route path="cadastro-staff" element={<CadStaff />} />
      <Route path="/orcamento" element={<Orcamento />} />
      <Route path="/propostas" element={<Propostas />} />
      <Route path="/orcamento-pdf/:orcamento_id" element={<Pdfgen />} />
      <Route path="/materiais/:id" element={<Materiais />} />
      <Route path="/servicos/:id" element={<Servicos />} />
      <Route path="/materiais/servicos/:id" element={<ServicosMateriais />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/clientes/:id" element={<Cliente />} />
    </Routes>
  );
};

export default Rotas;
