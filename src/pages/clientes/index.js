import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StaffNavbar from "../../components/staff-nav";

import api from "../../services/api";

import { FiInfo } from "react-icons/fi";

import "./styles.css";
import "../../global.css";

function Clientes() {
  const [isVisible, setIsVisible] = useState(false);
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleVerCliente = (id) => {
    navigate(`/clientes/${id}`);
  };

  return (
    <div className="clientes">
      <nav className="App-header">
        <StaffNavbar />
      </nav>
      <div className="container mt-4">
        <h2>Clientes</h2>
        <div className="clientes-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cnpj</th>
                <th>Celular</th>
                <th>Cidade</th>
                <th>Ver mais</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.cliente_id}>
                  <td>{cliente.cliente_id}</td>
                  <td>{cliente.cliente}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.cnpj}</td>
                  <td>{cliente.cel}</td>
                  <td>{cliente.cidade}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleVerCliente(cliente.cliente_id)}
                    >
                      <FiInfo />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*{isVisible && <AddConcessionaria />}
        <div className="button-add-concessionaria mt-3">
          <button className="btn btn-primary" onClick={handleButtonClick}>
            Adicionar Concessionária
          </button>
        </div>
        */}
      </div>
    </div>
  );
}

export default Clientes;
