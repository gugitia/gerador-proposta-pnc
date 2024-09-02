import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";

const Orcamento = () => {
  const [formData, setFormData] = useState({
    /*cliente id e vendedor id ficticios para teste*/
    cliente_id: 1,
    vendedor_id: 1,
    concessionaria: "",
    servico: "",
    potenciatotal: "",
    potenciaprimaria: "",
    potenciasecundaria: "",
    valortotal: "",
  });

  const [concessionarias, setConcessionarias] = useState([]);
  const [concessionariaId, setConcessionariaId] = useState("");
  const [servicos, setServicos] = useState([]);

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

  useEffect(() => {
    if (concessionariaId) {
      const fetchServicos = async () => {
        try {
          console.log(
            "Fetching services for concessionaria ID:",
            concessionariaId
          );
          const response = await api.get(
            `/servicos/concessionaria/${concessionariaId}`
          );
          setServicos(response.data);
        } catch (error) {
          console.error("Erro ao buscar serviços:", error);
        }
      };

      fetchServicos();
    }
  }, [concessionariaId]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "concessionaria") {
      setConcessionariaId(value);
    }
    if (name === "servico") {
      try {
        const response = await api.get(`/servicos/${value}`);
        const servico = response.data;

        setFormData({
          ...formData,

          servico: value,
          potenciatotal: servico.potenciatotal,
          potenciaprimaria: servico.potenciaprimaria,
          potenciasecundaria: servico.potenciasecundaria,
          valortotal: servico.valortotal,
        });
        console.log(formData);
      } catch (error) {
        console.error("Erro ao buscar serviço:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/orcamentos", formData);
      console.log("Orçamento criado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="form-group">
        <label htmlFor="concessionaria">Concessionaria</label>
        <select
          id="concessionaria"
          name="concessionaria"
          className="form-control"
          value={formData.concessionaria}
          onChange={handleChange}
        >
          <option value="">Selecione uma concessionária</option>
          {concessionarias.map((concessionaria) => (
            <option
              key={concessionaria.concessionaria_id}
              value={concessionaria.concessionaria_id}
            >
              {concessionaria.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="servico">Serviço</label>
        <select
          id="servico"
          name="servico"
          className="form-control"
          value={formData.servico}
          onChange={handleChange}
          required
          disabled={!formData.concessionaria}
        >
          <option value="">Selecione um serviço</option>
          {servicos.map((servico) => (
            <option key={servico.servico_id} value={servico.servico_id}>
              {servico.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="potenciatotal">Potência Total</label>
        <select
          id="potenciatotal"
          name="potenciatotal"
          className="form-control"
          value={formData.potenciatotal}
          onChange={handleChange}
          disabled
        >
          <option value="">{formData.potenciatotal}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="potenciaprimaria">Potência Primária</label>
        <select
          id="potenciaprimaria"
          name="potenciaprimaria"
          className="form-control"
          value={formData.potenciaprimaria}
          onChange={handleChange}
          disabled
        >
          <option value="">{formData.potenciaprimaria}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="potenciasecundaria">Potência Secundária</label>
        <select
          id="potenciasecundaria"
          name="potenciasecundaria"
          className="form-control"
          value={formData.potenciasecundaria}
          onChange={handleChange}
          disabled
        >
          <option value="">{formData.potenciasecundaria}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="valortotal">Valor Total</label>
        <select
          id="valortotal"
          name="valortotal"
          className="form-control"
          value={formData.valortotal}
          onChange={handleChange}
          disabled
        >
          <option value="">{formData.valortotal}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="obs">Observação</label>
        <input
          type="text"
          id="obs"
          name="obs"
          className="form-control"
          value={formData.obs}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Orcamento;
