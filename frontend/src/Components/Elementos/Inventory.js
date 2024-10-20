import placeholder from '../../assets/placeholder.png'; // Ajuste o caminho conforme a estrutura
import { useState } from 'react';
import styled from 'styled-components'; // Importando styled-components

// Estilos para o inventário
const ItemContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid #d35400;
  border-radius: 8px;
  background-color: #1f1f1f;
  box-shadow: 0 0 10px rgba(211, 84, 0, 0.7);
  
  &:hover {
    background-color: #333;
    cursor: pointer;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
  }

  p {
    color: #fff;
    margin-top: 10px;
  }
`;

const Inventory = () => {
  // Estado para armazenar os itens do inventário
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', img: placeholder },
    { id: 2, name: 'Item 2', img: placeholder },
    // Adicione mais itens conforme necessário
  ]);

  return (
    <div>
      {items.map(item => (
        <ItemContainer key={item.id}>
          <img src={item.img} alt={item.name} />
          <p>{item.name}</p>
        </ItemContainer>
      ))}
    </div>
  );
};

export default Inventory;