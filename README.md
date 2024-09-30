<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentação do Projeto: Gerador de Propostas</title>
</head>
<body>

<h1>Documentação do Projeto: Gerador de Propostas</h1>

<h2>1. Introdução</h2>
<p>
    Este projeto é um <strong>Gerador de Propostas</strong>, desenvolvido para facilitar a criação de orçamentos e recibos de serviços prestados pelas concessionárias registradas. A aplicação permite que o cliente selecione um serviço específico de uma concessionária e, com base nisso, gere automaticamente uma proposta com os materiais associados ao serviço em formato PDF.
</p>

<h2>2. Tecnologias Utilizadas</h2>
<ul>
    <li><strong>Frontend</strong>: React.js</li>
    <li><strong>Backend</strong>: Node.js com Express</li>
    <li><strong>Banco de Dados</strong>: MySQL</li>
    <li><strong>Bibliotecas Adicionais</strong>:
        <ul>
            <li>Axios (para requisições HTTP)</li>
            <li>React Router (para gerenciamento de rotas no frontend)</li>
            <li>Knex.js (para consultas e migrações no banco de dados)</li>
            <li>jsPDF (para geração de PDFs)</li>
            <li>JWT (para autenticação)</li>
        </ul>
    </li>
</ul>

<h2>3. Funcionalidades</h2>
<ul>
    <li><strong>Login de Usuário e Funcionário</strong>: 
        <ul>
            <li>Tela de login para usuários e funcionários (em desenvolvimento).</li>
            <li>Sessões de autenticação gerenciadas via JWT (a ser implementado).</li>
        </ul>
    </li>
    <li><strong>Seleção de Concessionária e Serviço</strong>: 
        <ul>
            <li>O cliente pode escolher uma concessionária a partir de uma lista.</li>
            <li>Após selecionar a concessionária, o cliente pode visualizar e selecionar os serviços disponíveis.</li>
            <li>Cada serviço possui uma lista de materiais associados, que é automaticamente carregada ao selecionar o serviço.</li>
        </ul>
    </li>
    <li><strong>Geração de Proposta e Recibo</strong>: 
        <ul>
            <li>A proposta inclui os detalhes do serviço e os materiais necessários.</li>
            <li>A funcionalidade gera automaticamente um PDF contendo todas as informações da proposta, incluindo os materiais e valores.</li>
        </ul>
    </li>
    <li><strong>Tabelas de Dados</strong>: 
        <ul>
            <li>O sistema possui uma interface de navegação com menu que permite selecionar e visualizar os dados de concessionárias, serviços e materiais.</li>
            <li>Cada entidade (concessionária, serviço e material) possui uma página dedicada com uma tabela listando os respectivos dados.</li>
        </ul>
    </li>
</ul>

<h2>4. Estrutura do Projeto</h2>

<h3>4.1. <em>Frontend</em> (React)</h3>
<p><strong>Páginas:</strong></p>
<ul>
    <li><code>cadastro-staff | cadastro-user</code>: Tela de cadastro para usuários e funcionários (não implementada totalmente).</li>
    <li><code>concessionarias</code>: Lista de concessionárias disponíveis.</li>
    <li><code>servicos</code>: Lista de serviços oferecidos por uma concessionária selecionada.</li>
    <li><code>materiais</code>: Lista de materiais de um serviço específico.</li>
    <li><code>propostas</code>: Tela de geração e visualização da proposta e do PDF.</li>
    <li><code>clientes</code>: Lista dos clientes registrados.</li>
    <li><code>orcamento</code>: Tela onde o cliente solicita orçamento.</li>
    <li><code>staff-menu</code>: Tela onde o funcionario acessa o menu.</li>
</ul>

<p><strong>Componentes:</strong></p>
<ul>
    <li><code>pdf-gen</code>: Componente que gera o pdf.</li>
    <li><code>staff-nav</code>: Menu fixo nas telas de funcionario.</li>
</ul>

<p><strong>Fluxo de Dados:</strong></p>
<ul>
    <li>Axios é utilizado para fazer as requisições ao backend.</li>
    <li>React Router para navegação entre as páginas.</li>
</ul>

<h2>5. Fluxo do Usuário</h2>
<ol>
    <li><strong>Login</strong>: 
        <p>O cliente ou funcionário acessa a tela de login, insere suas credenciais e é autenticado (essa parte está sendo implementada).</p>
    </li>
    <li><strong>Seleção de Concessionária</strong>: 
        <p>O cliente acessa a página inicial, seleciona a concessionária de interesse e visualiza os serviços oferecidos por ela.</p>
    </li>
    <li><strong>Seleção de Serviço</strong>: 
        <p>Ao escolher um serviço, o sistema carrega os materiais associados ao serviço e exibe uma tabela com os detalhes desses materiais.</p>
    </li>
    <li><strong>Geração da Proposta</strong>: 
        <p>Após a seleção, o cliente pode clicar em "Gerar Proposta", e o sistema compilará os dados do serviço e materiais selecionados, gerando um PDF com a proposta.</p>
    </li>
</ol>

<h2>6. Funcionalidades a Implementar</h2>
<ul>
    <li><strong>Autenticação Completa</strong>: 
        <p>Finalizar a implementação do login e autenticação via JWT para usuários e funcionários.</p>
    </li>
    <li><strong>Validação de Formulários</strong>: 
        <p>Melhorar as validações de entrada de dados na seleção de concessionárias e serviços.</p>
    </li>
    <li><strong>Melhorias na Geração de PDF</strong>: 
        <p>Adicionar mais informações personalizadas no PDF.</p>
    </li>
    <li><strong>Interface de Administração</strong>: 
        <p>Implementar uma área para que funcionários possam gerenciar concessionárias, serviços e materiais diretamente pela interface do sistema.</p>
    </li>
</ul>

<h2>7. Requisitos para Execução</h2>

<h3>7.1. <em>Frontend</em></h3>
<ol>
    <li>Instalar as dependências:
        <pre><code>npm install</code></pre>
    </li>
    <li>Executar a aplicação:
        <pre><code>npm start</code></pre>
    </li>
</ol>

<h3>7.2. <em>Backend</em></h3>
<ol>
    <li>Instalar as dependências:
        <pre><code>npm install</code></pre>
    </li>
    <li>Executar o servidor:
        <pre><code>npm start</code></pre>
    </li>
</ol>

<h3>7.3. <em>Banco de Dados</em></h3>
<p>Certifique-se de que o MySQL esteja instalado e rodando, e execute as migrações para criar as tabelas no banco:</p>
<pre><code>knex migrate:latest</code></pre>

<h2>8. Conclusão</h2>
<p>
    Este sistema de <strong>Gerador de Propostas</strong> é uma solução prática para empresas que prestam serviços e precisam gerar orçamentos de maneira rápida e automatizada. Ele ainda está em fase de desenvolvimento, com várias funcionalidades planejadas para serem implementadas, mas já oferece uma base sólida para gerenciamento de concessionárias, serviços e materiais.
</p>

</body>
</html>
