import { default as styled } from "styled-components";

const Footer = () => {
  const Styles = styled.div`
    .stan_footer
    {
      .footer-dark {
        background-color: black;
      }
    }
    
    `

  return (
    <Styles>
      <div className='App stan_footer'>

      </div>
    </Styles>
  );
};

export default Footer;
