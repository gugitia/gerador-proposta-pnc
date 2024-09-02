import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import api from "../../services/api";

import StaffNavbar from "../../components/staff-nav";
import AddMaterialForm from "./components/addmaterialform";

const Materiais = () => {
  const { id } = useParams();
  const [materiais, setMateriais] = useState([]);
  const [concessionariaNome, setConcessionariaNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchMateriais = async () => {
    try {
      console.log(materiais);
      const response = await api.get(`/materiais/concessionaria/${id}`);
      setMateriais(response.data);
    } catch (error) {
      setError("Erro ao buscar materiais");
      console.error("Erro ao buscar materiais:", error);
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

  const handleMaterialAdded = () => {
    fetchMateriais(); // Atualiza a lista de materiais
    setIsFormVisible(false); // Fecha o formulário
  };

  useEffect(() => {
    fetchMateriais();
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
      <h1>Materiais da Concessionária {concessionariaNome}</h1>

      <button className="btn btn-primary" onClick={handleToggleForm}>
        {isFormVisible ? "Fechar Formulário" : "Adicionar Material"}
      </button>

      {isFormVisible && (
        <div className="mt-3">
          <AddMaterialForm
            concessionariaId={id}
            onMaterialAdded={handleMaterialAdded}
            onClose={handleToggleForm}
          />
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Código</th>
            <th scope="col">Unidade</th>
            <th scope="col">Descrição</th>
            <th scope="col">Classificação Fiscal</th>
            <th scope="col">VI Substituição Tributária</th>
            <th scope="col">Valor Unidade</th>
            <th scope="col">IPI</th>
            <th scope="col">Suframa</th>
            <th scope="col">ICMS</th>
            <th scope="col">Concessionária ID</th>
          </tr>
        </thead>
        <tbody>
          {materiais.map((material) => (
            <tr key={material.material_id}>
              <th scope="row">{material.material_id}</th>
              <td>{material.codigo}</td>
              <td>{material.un}</td>
              <td>{material.descricao}</td>
              <td>{material.classfiscal}</td>
              <td>{material.vi_sub_trib}</td>
              <td>{material.valor_unidade}</td>
              <td>{material.ipi}</td>
              <td>{material.suframa}</td>
              <td>{material.icms}</td>
              <td>{material.concessionaria_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Materiais;
