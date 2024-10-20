import React from 'react';
import styled from 'styled-components';

const AtributosContainer = styled.div`
  background-color: transparent; /* Remover fundo */
  color: #fff; /* Cor do texto */
  // padding: 10px;
  border-radius: 8px;
  font-size: 1rem;

  .atributos-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  p {
    width: 32%;
    text-align: center;
    font-size: 14px;
    padding: 1px 3px;
    border: 1px solid #d35400;
    border-radius: 5px;
    box-shadow: 0 0 5px #d35400;
    margin-bottom: 5px;
  }
`;



const Atributos = () => {
  return (
    <AtributosContainer>
      <h3>Atributos</h3>
      <div class="atributos-container">
        <p>V: 1000</p>
        <p>D: 1000</p>
        <p>VA: 1000</p>
        <p>E: 1000</p>
        <p>CC: 1000</p>
        <p>DC: 1000</p>
      </div>
    </AtributosContainer>
  );
};

export default Atributos;