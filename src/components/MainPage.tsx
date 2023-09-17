import logo from "../images/MARK WHITE JPG.png";
import { default as styled } from "styled-components";

const Styles = styled.div`
  .gradient-text {
    text-align: center;
    margin-top: 20px;
    background-image: linear-gradient(0.25turn, red, blue);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    font-size: 40px;
    font-weight: bold;
    float: left;
    // margin-left: 20%;
  }
`;

const MainPage: React.FC = () => {
  return (
    <Styles>
      <div>
        {/* <div
          style={{
            backgroundImage: `url(${image})`,
            fontFamily: "MONTSERRAT",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            minWidth: "100vh",
            minHeight: "100vh",
          }}
        > */}
          <img
            src={logo}
            alt="stanly logo"
            style={{ height: "100px", width: "110px", float: "left" }}
          />
          <center>
          <p className="gradient-text">Shorten Your Loooong Links :)</p></center>
          <br></br>
        {/* </div> */}
      </div>
    </Styles>
  );
};

export default MainPage;
