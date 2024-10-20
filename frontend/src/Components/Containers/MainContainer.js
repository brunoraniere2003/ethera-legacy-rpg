import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%; /* Garante que o container ocupe 100% da altura */
  overflow: hidden; /* Remove qualquer rolagem da página */

  .menu-esquerdo, .menu-direito {
    padding: 10px;
    flex-basis: 320px; /* Ajuste conforme o layout desejado */
    height: calc(100vh - 26px);
    // background-color: #1a1a1a; /* Cor de fundo para visualização */
    overflow-y: auto; /* Permite rolagem interna se o conteúdo for maior que a altura */
  }

  .main-content { /* Adicione uma classe exclusiva para essa div */
    flex-grow: 1;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.08); /* Aplicado apenas aqui */
    margin: 0;
    overflow-y: auto; /* Rolagem interna somente no conteúdo do chat */
  }
`;

export default MainContainer;