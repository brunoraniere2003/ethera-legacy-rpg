import styled from 'styled-components';

const FooterContainer = styled.footer`
  font-size: 12px;
`;

const Footer = () => {
    return (
      <FooterContainer>
        <p className="footer-copyright">&copy; 2024 RPG Ethera Legacy. All rights reserved.</p>
      </FooterContainer>
    );
  };
  
  export default Footer;