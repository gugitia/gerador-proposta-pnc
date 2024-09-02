import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./styles.css";

import StaffNavbar from "../../components/staff-nav";

import api from "../../services/api";

import logo from "../../assets/logo.jpg";

function OrcamentoPDF() {
  const { orcamento_id } = useParams();
  const [orcamento, setOrcamento] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const [concessionaria, setConcessionaria] = useState(null);
  const [servico, setServico] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [ValorTotal, setValorTotal] = useState("");

  useEffect(() => {
    const fetchOrcamento = async () => {
      try {
        const response = await api.get(`/orcamentos/${orcamento_id}`);
        setOrcamento(response.data);

        const clienteResponse = await api.get(
          `/clientes/${response.data.cliente_id}`
        );
        setCliente(clienteResponse.data);

        const vendedorResponse = await api.get(
          `/vendedor/${response.data.vendedor_id}`
        );
        setVendedor(vendedorResponse.data.nome);

        const concessionariaResponse = await api.get(
          `/concessionarias/${response.data.concessionaria}`
        );
        setConcessionaria(concessionariaResponse.data.nome);

        const servicoResponse = await api.get(
          `/servicos/${response.data.servico}`
        );
        setServico(servicoResponse.data.nome);

        const materiaisResponse = await api.get(
          `/servicos-materiais/lista/${response.data.servico}`
        );
        setMateriais(materiaisResponse.data);

        const calcularValorTotal = () => {
          return materiais.reduce(
            (total, material) => total + material.valortotal,
            0
          );
        };
        setValorTotal(calcularValorTotal);
      } catch (error) {
        console.error("Erro ao buscar orçamento:", error);
      }
    };

    fetchOrcamento();
    console.log(cliente);
  }, [orcamento_id]);

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageHeight = pdf.internal.pageSize.height;
      const imgWidth = pdf.internal.pageSize.width;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`orcamento_${orcamento_id}.pdf`);
    });
  };

  if (!orcamento || !cliente || !vendedor || !concessionaria || !servico) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <nav className="App-header">
        <StaffNavbar />
      </nav>
      <button onClick={generatePDF} className="btn btn-primary mt-3">
        Gerar PDF
      </button>
      <div id="pdf-content" style={{ padding: "10px" }}>
        <h4>Dados do Cliente</h4>
        <table className="pdf-table table table-bordered">
          <tbody>
            {/*<img src={logo} alt="Logo" className="pdf-image" />*/}
            <tr>
              <th>Nome:</th>
              <td>{cliente.cliente}</td>
              <th>Email:</th>
              <td>{cliente.email}</td>
            </tr>
            <tr>
              <th>CNPJ:</th>
              <td>{cliente.cnpj}</td>
              <th>Celular:</th>
              <td>{cliente.cel}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Estado</th>
              <td>{cliente.uf}</td>
              <th>Cidade:</th>
              <td>{cliente.cidade}</td>
              <th>Endereço:</th>
              <td>{cliente.endereco}</td>
            </tr>
          </tbody>
        </table>
        <hr />

        <h4>Orçamento</h4>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>ID Orçamento:</th>
              <td>{orcamento.orcamento_id}</td>
              <th>Vendedor:</th>
              <td>{vendedor}</td>
            </tr>
            <tr>
              <th>Concessionária:</th>
              <td>{concessionaria}</td>
              <th>Serviço:</th>
              <td>{servico}</td>
            </tr>
            <tr>
              <th>Potência Primária:</th>
              <td>{orcamento.potenciaprimaria}</td>
              <th>Potência Total:</th>
              <td>{orcamento.potenciatotal}</td>
            </tr>
            <tr>
              <th>Potência Secundária:</th>
              <td>{orcamento.potenciasecundaria}</td>
              <th>Valor Total:</th>
              <td>{orcamento.valortotal}</td>
            </tr>
            <tr>
              <th>Observação:</th>
              <td colSpan="3">{orcamento.obs}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h3>Materiais do Serviço</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Código</th>
              <th>Material</th>
              <th>Quantidade</th>
              <th>Unidade</th>
              <th>Valor Unitário</th>
              <th>Valor Total</th>
              <th>Classificação Fiscal</th>
              <th>vi_sub_trib</th>
              <th>IPI</th>
              <th>Suframa</th>
              <th>ICMS</th>
            </tr>
          </thead>
          <tbody>
            {materiais.map((material, index) => (
              <tr key={material.material_id}>
                <td>{material.material_id}</td>
                <td>{index + 1}</td>
                <td>{material.codigo}</td>
                <td>{material.descricao}</td>
                <td>{material.quantidade}</td>
                <td>{material.un}</td>
                <td>{material.valor_unidade}</td>
                <td>{material.valortotal}</td>
                <td>{material.classfiscal}</td>
                <td>{material.vi_sub_trib}</td>
                <td>{material.ipi}</td>
                <td>{material.suframa}</td>
                <td>{material.icms}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <h4>VALOR TOTAL: {ValorTotal}</h4>
        <p>
          FATURAMENTO MINIMO: R$300,00. Devido a oscilação de produtos e/ou
          matéria prima os preços são validos somente para material em estoque e
          estão sujeitos a confirmação no ato da compra, portanto verificar
          condições com o vendedor no ato da negociação. HORARIO DE RETIRA DE
          SEGUNDA A SEXTA-FEIRA das 8:15 às 11:30 e das 13: 30 as 17:30hs.
          POLÍTICA DE DEVOLUÇÃO: Somente aceitaremos trocas e/ou devoluções
          conforme regras do formulário de devolução preenchido e com código de
          autorização. Para CNPJS fora do ESTADO DE SP, o valor do ICMS PARTILHA
          ou ST /FCP ou FCP-ST é de: R$ 0,00, a vista contra embarque e será
          abatido do valor total do pedido. O imposto DAEMS não está incluso no
          orçamento para o estado do MS. OBS: Orçamento valido somente para o
          CNPJ acima
        </p>
        <h5>ORDEM DE COMPRA:</h5>
      </div>
    </div>
  );
}

export default OrcamentoPDF;
