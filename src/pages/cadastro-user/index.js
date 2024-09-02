import React, { useState } from "react";
import { Button, Form, Tab, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CadastroForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cnpj: "",
    cliente: "",
    email: "",
    senha: "",
    contato: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    uf: "",
    tel: "",
    cel: "",
    ramal: "",
    inscricao_estadual: "",
    fax: "",
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePreviousStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clientes", formData);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao cadastrar cliente.");
    }
  };
  const orcamento = async (e) => {
    navigate("/orcamento");
  };

  return (
    <div className="container mt-5">
      <Tab.Container id="left-tabs-example" activeKey={step}>
        <Row>
          <Col sm={12}>
            <div className="mb-4">
              <h2>Cadastro de Cliente</h2>
              <button onClick={orcamento}>Solicitar Orçamento</button>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey={1}>
                <Form onSubmit={handleNextStep}>
                  <Form.Group controlId="formCnpj">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="Digite o CNPJ"
                    />
                  </Form.Group>

                  <Form.Group controlId="formCliente">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="cliente"
                      value={formData.cliente}
                      onChange={handleChange}
                      placeholder="Digite o nome"
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Digite o email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formSenha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      placeholder="Digite a senha"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Próxima Etapa
                  </Button>
                </Form>
              </Tab.Pane>

              <Tab.Pane eventKey={2}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formContato">
                    <Form.Label>Contato</Form.Label>
                    <Form.Control
                      type="text"
                      name="contato"
                      value={formData.contato}
                      onChange={handleChange}
                      placeholder="Digite o contato"
                    />
                  </Form.Group>

                  <Form.Group controlId="formCep">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control
                      type="text"
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      placeholder="Digite o CEP"
                    />
                  </Form.Group>

                  <Form.Group controlId="formEndereco">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      placeholder="Digite o endereço"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBairro">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control
                      type="text"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      placeholder="Digite o bairro"
                    />
                  </Form.Group>

                  <Form.Group controlId="formCidade">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      placeholder="Digite a cidade"
                    />
                  </Form.Group>

                  <Form.Group controlId="formUf">
                    <Form.Label>UF</Form.Label>
                    <Form.Control
                      type="text"
                      name="uf"
                      value={formData.uf}
                      onChange={handleChange}
                      placeholder="Digite a UF"
                    />
                  </Form.Group>

                  <Form.Group controlId="formTel">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      name="tel"
                      value={formData.tel}
                      onChange={handleChange}
                      placeholder="Digite o telefone"
                    />
                  </Form.Group>

                  <Form.Group controlId="formCel">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                      type="text"
                      name="cel"
                      value={formData.cel}
                      onChange={handleChange}
                      placeholder="Digite o celular"
                    />
                  </Form.Group>

                  <Form.Group controlId="formRamal">
                    <Form.Label>Ramal</Form.Label>
                    <Form.Control
                      type="text"
                      name="ramal"
                      value={formData.ramal}
                      onChange={handleChange}
                      placeholder="Digite o ramal"
                    />
                  </Form.Group>

                  <Form.Group controlId="forminscricao_estadual">
                    <Form.Label>Inscrição Estadual</Form.Label>
                    <Form.Control
                      type="text"
                      name="inscricao_estadual"
                      value={formData.inscricao_estadual}
                      onChange={handleChange}
                      placeholder="Digite a inscrição estadual"
                    />
                  </Form.Group>

                  <Form.Group controlId="formFax">
                    <Form.Label>Fax</Form.Label>
                    <Form.Control
                      type="text"
                      name="fax"
                      value={formData.fax}
                      onChange={handleChange}
                      placeholder="Digite o fax"
                    />
                  </Form.Group>

                  <Button variant="secondary" onClick={handlePreviousStep}>
                    Voltar
                  </Button>
                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default CadastroForm;
