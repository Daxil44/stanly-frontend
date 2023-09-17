import React from "react";
import { default as styled } from "styled-components";
import errorImage from "../images/error.png";
import overlayImage from "../images/astro.png";

const Styles = styled.div`
  .error {
    .main {
      height: 100vh;
      width: 100vw;
      background-image: url(${errorImage});
      background-size: cover; /* Set the background image size to 80% of the container */
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: flex-end; /* Align the div to the bottom of the container */
      flex-direction: column;
      text-align: center;
      padding-bottom: 20vh; /* Add some padding at the bottom to separate it from the edge */
      background-repeat: no-repeat;
    }

   
    .para {
      color: #fff;
      font-size: 2rem;
      margin-bottom: 20px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .para2 {
      color: #ffcc00; /* Set the color for para2 */
      font-size: 1.8rem; /* Set the font size for para2 */
      font-weight: bold; /* Add bold font weight to para2 */
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add a text shadow for better contrast */
      margin: -8px;
    }
    
    .homebutton {
      padding: 10px 24px;
      font-size: 1.2rem;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 15px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 10px;
    }

    .homebutton:hover {
      background-color: #0056b3;
    }
  }


`;



const Error404: React.FC = () => {
  return (
    <>
      <Styles>
        <div className="error">
          <div className="main">
            {/* <p className="para">OOPS!</p> */}
            <p className="para2">PAGE NOT FOUND</p>
            <a href="/"><button className="homebutton">Home</button></a>
            <div className="overlay" />
          </div>
        </div>
      </Styles>
    </>
  );
};

export default Error404;