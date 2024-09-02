import React, { useState } from "react";
import api from "../../../../services/api";

const AddServiceForm = ({ concessionariaId, onServiceAdded, onClose }) => {
  const [nome, setNome] = useState("");
  const [potenciatotal, setPotenciaTotal] = useState("");
  const [potenciaprimaria, setPotencia1] = useState("");
  const [potenciasecundaria, setPotencia2] = useState("");
  const [valortotal, setValortotal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newServico = {
      nome,
      potenciatotal,
      potenciaprimaria,
      potenciasecundaria,
      valortotal,
      concessionaria_id: concessionariaId,
    };

    try {
      console.log(newServico);
      await api.post("/servicos", newServico);
      onServiceAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar Serviço:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome do Servico</label>
        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Potencia Total</label>
        <input
          type="text"
          className="form-control"
          value={potenciatotal}
          onChange={(e) => setPotenciaTotal(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Potencia Primaria</label>
        <input
          type="text"
          className="form-control"
          value={potenciaprimaria}
          onChange={(e) => setPotencia1(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Potencia Secundaria</label>
        <input
          type="text"
          className="form-control"
          value={potenciasecundaria}
          onChange={(e) => setPotencia2(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Valor Total</label>
        <input
          type="text"
          className="form-control"
          value={valortotal}
          onChange={(e) => setValortotal(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Adicionar serviço
      </button>
      <button type="button" className="btn btn-secondary" onClick={onClose}>
        Cancelar
      </button>
    </form>
  );
};

export default AddServiceForm;
