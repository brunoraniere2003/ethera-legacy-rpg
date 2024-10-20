import placeholder from '../../assets/placeholder.png'; // Caminho do placeholder
import { useState } from 'react';
import styled from 'styled-components'; // Estilos usando styled-components

// Estilos para o container do inventário com flexbox
const InventoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Slot = styled.div`
  // background-color: #1f1f1f;
  // border: 2px solid #d35400;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
  // box-shadow: 0 0 10px rgba(211, 84, 0, 0.7);

  img {
    width: 70px;
    // height: 25%;
  }

  &:hover {
    background-color: #333;
    cursor: pointer;
  }
`;

const SlotsName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
  font-weight: bold;

  h4 {
    font-size: 14px;
    width: 70px;
    text-align: center;
  }
`;

const SlotsEmpty = styled.div`
  width: 70px;
  height: 70px;
  border: 2px solid #d35400;
  border-radius: 8px;
  margin-bottom: 3px;
`;

const Inventory = () => {
  // Simulando slots vazios
  const [slots] = useState(new Array(5).fill(placeholder));
  const [slotsMain] = useState(new Array(4).fill(placeholder));

  return (
    <>
      <h3>Inventory</h3>
      <SlotsName>
        <h4>Arma</h4>
        <h4>Veste</h4>
        <h4>Acessório</h4>
        <h4>Mochila</h4>
      </SlotsName>
      <InventoryContainer>
        {slotsMain.map((slot, index) => (
          <Slot key={index}>
            <img src={slot} alt={`Slot ${index + 1}`} />
          </Slot>
        ))}
      </InventoryContainer>
      <SlotsName>
        <h4>Slots</h4>
      </SlotsName>
      <InventoryContainer>
        {slots.map((slot, index) => (
          <Slot key={index}>
            <img src={slot} alt={`Slot ${index + 1}`} />
          </Slot>
        ))}
      </InventoryContainer>
    </>
  );
};

export default Inventory;