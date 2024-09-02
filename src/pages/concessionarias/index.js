import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StaffNavbar from "../../components/staff-nav";
import AddConcessionaria from "./components";
import api from "../../services/api";

import { FiPackage, FiTool, FiEdit } from "react-icons/fi";

import "./styles.css";
import "../../global.css";

function Concessionarias() {
  const [isVisible, setIsVisible] = useState(false);
  const [concessionarias, setConcessionarias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcessionarias = async () => {
      try {
        const response = await api.get("/concessionarias");
        setConcessionarias(response.data);
      } catch (error) {
        console.error("Erro ao buscar concessionárias:", error);
      }
    };

    fetchConcessionarias();
  }, []);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const handleVerMateriais = (id) => {
    navigate(`/materiais/${id}`);
  };

  const handleVerServicos = (id) => {
    navigate(`/servicos/${id}`);
  };

  return (
    <div className="concessionaria">
      <nav className="App-header">
        <StaffNavbar />
      </nav>
      <div className="container mt-4">
        <h2>Concessionarias</h2>
        <div className="concessionaria-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Materiais</th>
                <th>Serviços</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {concessionarias.map((concessionaria) => (
                <tr key={concessionaria.concessionaria_id}>
                  <td>{concessionaria.concessionaria_id}</td>
                  <td>{concessionaria.nome}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        handleVerMateriais(concessionaria.concessionaria_id)
                      }
                    >
                      <FiPackage />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() =>
                        handleVerServicos(concessionaria.concessionaria_id)
                      }
                    >
                      <FiTool />
                    </button>
                  </td>
                  <td>
                    <FiEdit />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isVisible && <AddConcessionaria />}
        <div className="button-add-concessionaria mt-3">
          <button className="btn btn-primary" onClick={handleButtonClick}>
            Adicionar Concessionária
          </button>
        </div>
      </div>
    </div>
  );
}

export default Concessionarias;
