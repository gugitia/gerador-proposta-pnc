import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";

const VendedorForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cell: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await api.post("/vendedor", formData);
      window.alert("Vendedor criado:", response.data);
    } catch (error) {
      console.error("Erro ao criar vendedor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="form-group">
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="form-control"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cell">Celular</label>
        <input
          type="text"
          id="cell"
          name="cell"
          className="form-control"
          value={formData.cell}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          className="form-control"
          value={formData.senha}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Criar Vendedor
      </button>
    </form>
  );
};

export default VendedorForm;
