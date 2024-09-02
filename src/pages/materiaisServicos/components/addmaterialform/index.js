import React, { useState, useEffect } from "react";
import api from "../../../../services/api";

const AddMaterialServiceForm = ({
  concessionariaId,
  servicoId,
  onMaterialAdded,
  onClose,
}) => {
  const [materiais, setMateriais] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valortotal, setValortotal] = useState("");

  useEffect(() => {
    const fetchMateriais = async () => {
      try {
        const response = await api.get(
          `/materiais/concessionaria/${concessionariaId}`
        );
        setMateriais(response.data);
      } catch (error) {
        console.error("Erro ao buscar materiais:", error);
      }
    };

    fetchMateriais();
  }, [concessionariaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMaterialTemplate = {
      material_Id: materialId,
      template_Id: servicoId,
      concessionaria_id: concessionariaId, // Aqui está correto
      quantidade,
      valortotal,
    };

    try {
      console.log(newMaterialTemplate);
      await api.post("/servicos-materiais", newMaterialTemplate);
      onMaterialAdded();
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar material ao template:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Material</label>
        <select
          className="form-control"
          value={materialId}
          onChange={(e) => setMaterialId(e.target.value)}
          required
        >
          <option value="">Selecione um material</option>
          {materiais.map((material) => (
            <option key={material.material_id} value={material.material_id}>
              {material.descricao}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Quantidade</label>
        <input
          type="number"
          className="form-control"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Valor Total</label>
        <input
          type="number"
          className="form-control"
          value={valortotal}
          onChange={(e) => setValortotal(e.target.value)}
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

export default AddMaterialServiceForm;
