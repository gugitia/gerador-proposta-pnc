import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import api from "../../services/api";

import StaffNavbar from "../../components/staff-nav";
import AddMaterialServiceForm from "./components/addmaterialform";

const MateriaisServicos = () => {
  const { id } = useParams();
  const [materiais, setMateriais] = useState([]);
  const [concessionaria_id, setConcessionariaId] = useState("");
  const [concessionariaNome, setConcessionariaNome] = useState("");
  const [servicoNome, setServicoNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [servicoId, setServicoId] = useState(null);

  const fetchMateriais = async () => {
    try {
      const response = await api.get(`/servicos-materiais/lista/${id}`);
      setMateriais(response.data);
    } catch (error) {
      setError("Erro ao buscar materiais");
      console.error("Erro ao buscar materiais:", error);
    }
  };

  const fetchConcessionariaNome = async () => {
    try {
      const servicoResponse = await api.get(`/servicos/${id}`);

      const concessionaria_id = servicoResponse.data.concessionaria_id;
      console.log("o concessionaria id é " + servicoResponse.data);

      const concessionariaResponse = await api.get(
        `/concessionarias/${concessionaria_id}`
      );
      setConcessionariaNome(concessionariaResponse.data.nome);
      setConcessionariaId(concessionaria_id);
    } catch (error) {
      setError("Erro ao buscar o nome da concessionária");
      console.error("Erro ao buscar o nome da concessionária:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServicoNome = async () => {
    try {
      const response = await api.get(`/servicos/${id}`);
      setServicoNome(response.data.nome);
      setServicoId(response.data.servico_id);
    } catch (error) {
      setError("Erro ao buscar o nome do Serviço");
      console.error("Erro ao buscar o nome do Serviço:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialAdded = () => {
    fetchMateriais();
    setIsFormVisible(false);
  };

  useEffect(() => {
    fetchMateriais();
    fetchServicoNome();
    fetchConcessionariaNome();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="materiais">
      <nav className="App-header">
        <StaffNavbar />
      </nav>
      <h1>
        Materiais do Serviço {servicoNome} - Concessionária {concessionariaNome}
      </h1>

      <button className="btn btn-primary" onClick={handleToggleForm}>
        {isFormVisible ? "Fechar Formulário" : "Adicionar Material"}
      </button>

      {isFormVisible && (
        <div className="mt-3">
          <AddMaterialServiceForm
            servicoId={id}
            concessionariaId={concessionaria_id}
            onMaterialAdded={handleMaterialAdded}
            onClose={handleToggleForm}
          />
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Codigo</th>
            <th scope="col">Quantidade</th>
            <th scope="col">ValorTotal</th>
            <th scope="col">Unidade</th>
            <th scope="col">Descrição</th>
            <th scope="col">Classificação Fiscal</th>
            <th scope="col">VI Substituição Tributária</th>
            <th scope="col">Valor Unidade</th>
            <th scope="col">IPI</th>
            <th scope="col">Suframa</th>
            <th scope="col">ICMS</th>
          </tr>
        </thead>
        <tbody>
          {materiais.map((material) => (
            <tr key={material.material_id}>
              <th scope="row">{material.material_id}</th>
              <td>{material.codigo}</td>
              <td>{material.quantidade}</td>
              <td>{material.valortotal}</td>
              <td>{material.un}</td>
              <td>{material.descricao}</td>
              <td>{material.classfiscal}</td>
              <td>{material.vi_sub_trib}</td>
              <td>{material.valor_unidade}</td>
              <td>{material.ipi}</td>
              <td>{material.suframa}</td>
              <td>{material.icms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MateriaisServicos;
