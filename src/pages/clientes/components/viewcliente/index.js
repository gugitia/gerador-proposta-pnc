import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../../services/api";

import "./styles.css";

import StaffNavbar from "../../../../components/staff-nav";
import { Navbar } from "react-bootstrap";

const Cliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/clientes/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do cliente:", error);
      }
    };

    fetchCliente();
  }, [id]);

  if (!cliente) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <StaffNavbar />
      <div className="clienteview">
        <h1>Detalhes do Cliente</h1>
        <ul>
          <li>
            <strong>Nome:</strong> {cliente.cliente}
          </li>
          <li>
            <strong>Email:</strong> {cliente.email}
          </li>
          <li>
            <strong>Contato:</strong> {cliente.contato}
          </li>
          <li>
            <strong>CEP:</strong> {cliente.cep}
          </li>
          <li>
            <strong>Endereço:</strong> {cliente.endereco}
          </li>
          <li>
            <strong>Bairro:</strong> {cliente.bairro}
          </li>
          <li>
            <strong>Cidade:</strong> {cliente.cidade}
          </li>
          <li>
            <strong>UF:</strong> {cliente.uf}
          </li>
          <li>
            <strong>Tel:</strong> {cliente.tel}
          </li>
          <li>
            <strong>Celular:</strong> {cliente.cel}
          </li>
          <li>
            <strong>Ramal:</strong> {cliente.ramal}
          </li>
          <li>
            <strong>CNPJ:</strong> {cliente.cnpj}
          </li>
          <li>
            <strong>Inscrição Estadual:</strong> {cliente.inscricao_estadual}
          </li>
          <li>
            <strong>Fax:</strong> {cliente.fax}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cliente;
