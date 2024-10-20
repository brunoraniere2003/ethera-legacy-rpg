import React from 'react';

import MainContainer from './Components/Containers/MainContainer';
import MenuEsquerdo from './Components/Menus/MenuEsquerdo';
import MenuDireito from './Components/Menus/MenuDireito';
import Footer from './Components/Footer/Footer';

import GlobalStyle from './GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <div className="menu-esquerdo">
          <MenuEsquerdo />
        </div>
        <div>Conteúdo do chat</div>
        <div className="menu-direito">
          <MenuDireito />
        </div>
      </MainContainer>
      <Footer />
    </>
  );
}

export default App;
