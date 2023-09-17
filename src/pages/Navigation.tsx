import image from "../images/MARK WHITE JPG.jpg";
import { default as styled } from "styled-components";

const Navigation = () => {
  const Styles = styled.div`
  .navigation{
    .header
    {
      background-color: black;
    }

    img
    {
      height:100px;
      width:110px;
    }

    #search
    {
      text-align: center;
      float: right;
      margin-top: 30px;
      margin-right:20px;
      padding:10px;
      width:10%;
      border-radius: 25px;
      background-color: #008cfa;
      border: none;
      color: white;
    }

    #analytics
    {
      float:right;
      text-align: center;
      margin-top: 30px;
      margin-right:20px;
      padding:10px;
      width:10%;
      border-radius: 25px;
      background-color: #0e0e19;
      border: none;
      color: white;
    }

  }
  
  `;

  return (
    <Styles>
      <div className="App navigation">
        <div className="header">
          <img src={image} alt="stanly logo" />
          {/* <button id="search" type="button" value="Search">Search</button>
          <button id="analytics" type="button" value="Analytics">Analytics</button> */}
        </div>
      </div>
    </Styles>
  );
};
export default Navigation;
