import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StaffNavbar from "../../components/staff-nav";

import api from "../../services/api";

import { FiInfo } from "react-icons/fi";

import "./styles.css";
import "../../global.css";

function Propostas() {
  const [orcamentos, setOrcamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const response = await api.get("/orcamentos");
        setOrcamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar orçamentos:", error);
      }
    };

    fetchOrcamentos();
  }, []);

  const handleVerOrcamento = (id) => {
    navigate(`/orcamento-pdf/${id}`);
  };

  return (
    <div className="orcamentos">
      <nav className="App-header">
        <StaffNavbar />
      </nav>
      <div className="container mt-4">
        <h2>Orçamentos</h2>
        <div className="orcamentos-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente ID</th>
                <th>Vendedor ID</th>
                <th>Concessionaria ID</th>
                <th>Serviço ID</th>
                <th>Potência Total</th>
                <th>Potência Primária</th>
                <th>Potência Secundária</th>
                <th>Valor Total</th>
                <th>Ver PDF proposta</th>
              </tr>
            </thead>
            <tbody>
              {orcamentos.map((orcamento) => (
                <tr key={orcamento.orcamento_id}>
                  <td>{orcamento.orcamento_id}</td>
                  <td>{orcamento.cliente_id}</td>
                  <td>{orcamento.vendedor_id}</td>
                  <td>{orcamento.concessionaria}</td>
                  <td>{orcamento.servico}</td>
                  <td>{orcamento.potenciatotal}</td>
                  <td>{orcamento.potenciaprimaria}</td>
                  <td>{orcamento.potenciasecundaria}</td>
                  <td>{orcamento.valortotal}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleVerOrcamento(orcamento.orcamento_id)}
                    >
                      <FiInfo />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Propostas;
