import React, { useState } from "react";
import "./styles.css";

import api from "../../../services/api";

const AddConcessionaria = () => {
  const [nome, setnomeConcessionaria] = useState([]);

  async function handleAddConcessionaria(e) {
    e.preventDefault();
    const data = {
      nome,
    };
    console.log(data);

    try {
      const response = await api.post("/concessionarias", data);

      alert(`Concessionaria criada: ${response.data.concessionaria_id}`);
    } catch (err) {
      alert("erro no cadastro da concessionaria");
    }
  }
  return (
    <div className="add-concessionaria">
      <h3>Adicionar nova concessionaria</h3>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setnomeConcessionaria(e.target.value)}
      ></input>
      <br />
      <button onClick={handleAddConcessionaria}>Adicionar</button>
    </div>
  );
};

export default AddConcessionaria;
