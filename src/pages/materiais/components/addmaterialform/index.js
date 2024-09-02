import React, { useState } from "react";
import api from "../../../../services/api";

const AddMaterialForm = ({ concessionariaId, onMaterialAdded, onClose }) => {
  const [codigo, setCodigo] = useState("");
  const [un, setUn] = useState("");
  const [descricao, setDescricao] = useState("");
  const [classfiscal, setClassfiscal] = useState("");
  const [viSubTrib, setViSubTrib] = useState("");
  const [valorUnidade, setValorUnidade] = useState("");
  const [ipi, setIpi] = useState("");
  const [suframa, setSuframa] = useState("");
  const [icms, setIcms] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMaterial = {
      codigo,
      un,
      descricao,
      classfiscal,
      vi_sub_trib: viSubTrib,
      valor_unidade: valorUnidade,
      ipi,
      suframa,
      icms,
      concessionaria_id: concessionariaId,
    };

    try {
      console.log(newMaterial);
      await api.post("/materiais", newMaterial);
      onMaterialAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar material:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Código</label>
        <input
          type="text"
          className="form-control"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Unidade</label>
        <input
          type="text"
          className="form-control"
          value={un}
          onChange={(e) => setUn(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          className="form-control"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Classificação Fiscal</label>
        <input
          type="text"
          className="form-control"
          value={classfiscal}
          onChange={(e) => setClassfiscal(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>VI Substituição Tributária</label>
        <input
          type="number"
          className="form-control"
          value={viSubTrib}
          onChange={(e) => setViSubTrib(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Valor Unidade</label>
        <input
          type="number"
          className="form-control"
          value={valorUnidade}
          onChange={(e) => setValorUnidade(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>IPI</label>
        <input
          type="number"
          className="form-control"
          value={ipi}
          onChange={(e) => setIpi(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Suframa</label>
        <input
          type="number"
          className="form-control"
          value={suframa}
          onChange={(e) => setSuframa(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>ICMS</label>
        <input
          type="number"
          className="form-control"
          value={icms}
          onChange={(e) => setIcms(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Adicionar Material
      </button>
      <button type="button" className="btn btn-secondary" onClick={onClose}>
        Cancelar
      </button>
    </form>
  );
};

export default AddMaterialForm;
