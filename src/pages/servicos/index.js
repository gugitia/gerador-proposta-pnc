import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import { FiPackage } from "react-icons/fi";

import api from "../../services/api";

import StaffNavbar from "../../components/staff-nav";
import AddServiceForm from "./components/addserviceform";

const Servicos = () => {
  const { id } = useParams(); // Esse é o ID da concessionária
  const [servicos, setServicos] = useState([]);
  const [concessionariaNome, setConcessionariaNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  const fetchServicos = async () => {
    try {
      console.log(servicos);
      const response = await api.get(`/servicos/concessionaria/${id}`);
      setServicos(response.data);
    } catch (error) {
      setError("Erro ao buscar servicos");
      console.error("Erro ao buscar servicos:", error);
    }
  };

  const fetchConcessionariaNome = async () => {
    try {
      const response = await api.get(`/concessionarias/${id}`);
      setConcessionariaNome(response.data.nome);
    } catch (error) {
      setError("Erro ao buscar o nome da concessionária");
      console.error("Erro ao buscar o nome da concessionária:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceAdded = () => {
    fetchServicos();
    setIsFormVisible(false);
  };

  const handleVerMateriais = (servicoId) => {
    navigate(`/materiais/servicos/${servicoId}`);
  };

  useEffect(() => {
    fetchServicos();
    fetchConcessionariaNome();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="servicos">
      <nav className="App-header">
        <StaffNavbar />
      </nav>
      <h1>Serviços da Concessionária {concessionariaNome}</h1>

      <button className="btn btn-primary" onClick={handleToggleForm}>
        {isFormVisible ? "Fechar Formulário" : "Adicionar Serviço"}
      </button>

      {isFormVisible && (
        <div className="mt-3">
          <AddServiceForm
            concessionariaId={id}
            onServiceAdded={handleServiceAdded}
            onClose={handleToggleForm}
          />
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Potência Total</th>
            <th scope="col">Potência Primária</th>
            <th scope="col">Potência Secundária</th>
            <th scope="col">Valor Total</th>
            <th scope="col">Materiais</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico) => (
            <tr key={servico.servico_id}>
              <th scope="row">{servico.servico_id}</th>
              <td>{servico.nome}</td>
              <td>{servico.potenciatotal}</td>
              <td>{servico.potenciaprimaria}</td>
              <td>{servico.potenciasecundaria}</td>
              <td>{servico.valortotal}</td>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleVerMateriais(servico.servico_id)}
                >
                  <FiPackage />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Servicos;
