import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { response } from "express";
import { API } from "../global";
import Error404 from "./Error404";

const Redirect: React.FC = () => {
  const params = useParams<{ short_code: string }>();
  const [status, setStatus] = useState<"SEARCHING" | "FOUND" | "NOT_FOUND">(
    "SEARCHING"
  );

  useEffect(() => {
    async function redirect() {
      if (params.short_code) await getRedirect(params.short_code);
    }
    redirect();
  });

  const getRedirect = async (short_code: string) => {
    console.log(short_code);
    // API CCCALL post {short_url: short_code} Replace the code below

    try {
      const response = await axios.post(`${API}/find`, {
        short_url: short_code,
      });
      console.log(response.data);
      console.log(response.data.link.short_url);
      console.log(response.data.link.long_url);

      if (short_code === response.data.link.short_url) {
        setStatus("FOUND");
        window.location.replace(response.data.link.long_url);
      } else {
        setStatus("NOT_FOUND");
      }
    } catch (error) {
      console.log(error);
      setStatus("NOT_FOUND");
    }
  };

  return (
    <div>
      <div hidden={status !== "SEARCHING"}>
        <Spinner
          animation="border"
          style={{
            color: "white",
            width: "100px",
            height: "100px",
            position: "relative",
            left: "45%",
            right: "50%",
            marginTop: "19%"
          }}
        />
        <p style={{color:"#007bff",fontFamily: "MONTSERRAT", textAlign: "center", marginTop:"2%"}}><h1>Just a moment...</h1></p>
      </div>
      <div hidden={status !== "NOT_FOUND"}>
        <Error404 />
      </div>
    </div>
  );
};

export default Redirect;
