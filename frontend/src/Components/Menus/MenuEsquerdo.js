import React from 'react';
import Inventory from '../Elementos/Inventory';
import Atributos from '../Elementos/Atributos'; // Novo componente para os atributos

import placeholder from '../../assets/placeholder-mage.jpg';
import styled from 'styled-components';

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px; /* Exemplo de estilização extra */
`;

const MenuEsquerdo = () => {
  return (
    <div>
      <h2>Bruno Raniere</h2>
      <StyledImg src={placeholder} alt="Personagem" />
      <Atributos />
      <Inventory />
    </div>
  );
};

export default MenuEsquerdo;