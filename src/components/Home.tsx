import image from "../images/link.png";
import bg from "../images/BG.png";
import search_img from "../images/search.png";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { default as styled } from "styled-components";
import EditModal from "./EditModal";
import Spinner from "react-bootstrap/Spinner";
import DataTable, { Alignment, Direction } from "react-data-table-component";
import { useParams } from "react-router-dom";
import { API } from "../global";
import MainPage from "./MainPage";
import { response } from "express";

const Styles = styled.div`
.home {
  form {
    display: flex;
    flex-direction: row;
    // border: 1px solid white;
    width: 90%;
    margin: auto;
    padding: auto;
    position: relative;
  }

  .form_tab input
  {
      flex-grow: 2;
      border: none;
      // padding: 15px; 
      // padding-left:auto;
      // margin-left: auto;
      background-color: #0e0e19;
      border-radius: 25px;
      color: white;
      margin: 0;
      margin-bottom: 15px;
    
  }

  .form_tab input
  {
    border: 0.5px solid whitesmoke;
    background-color: rgb(12 24 33);
  }

  input {
    flex-grow: 2;
    border: none;
    padding: 15px;
    width: 20%;
    background-color: #0e0e19;
    border-radius: 25px;
    color: white;
    margin: 0;
    padding-left: 50px;
    margin-bottom: 15px;
  }
  input:focus {
    outline: none;
  }
  input:focus-within {
    outline: 1px solid #222121;
  }

  img {
    position: absolute;
    bottom: 32px;
    left: 14px;
    width: 20px;
    height: 20px;
  }
  button {
    margin-left: 15px;
    text-align: center;
    width: 25%;
    border-radius: 25px;
    background-color: #008cfa;
    border: none;
    color: white;
    margin-bottom: 15px;
  }
  .form_tab
  {
    width: 100%;
    background-color: none;
  }

  .form_tab tr
  {
    background-image: url(${bg});
  }
  table {
    border-collapse: collapse;
    width: 90%;
    margin: auto;
    padding: auto;
    background-image: url(${bg});
    border-radius: 27px;
    border: 1px solid black;
  }
  table td,
  table th {
    padding: 10px;
    text-align: center;
  }
  table thead {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #0e131e;
    color: white;
  }

  table tr {
    background-color: #0e0e19;
    opacity: 0.9;
  }
  table td {
    color: white;
  }
  .search-container {
    display: flex;
    flex-direction: row;
    // border: 1px solid white;
    width: 50%;
    margin: auto;
    padding: auto;
    position: relative;
  }

  .input-container {
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center horizontally */
  }

  .error-message {
    color: red;
    font-size: 15px;
    margin-left: 10%;
  }
  .success-message {
    color: green;
    font-size: 17px;
    margin-left: 10%;
    font-weight: bold;
  }
  .success-update-message {
    color: green;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
  }
`;

type Link = {
  _id: string;
  long_url: string;
  short_url: string;
  creation_date: Date;
  //ip_address : string,
};

const Home = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(2);
  const [shortUrl, setShortUrl] = useState("");
  const [newLink, setNewLink] = useState("");
  const [status, setStatus] = useState<"LOADING" | "DONE">("LOADING");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [updatingLink, setUpdatingLink] = useState(false);
  const [generatingShortLink, setGeneratingShortLink] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [successGeneration, setSuccessGeneration] = useState<string>("");
  const [successUpdate, setSuccessUpdate] = useState<string>("");
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const params = useParams<{ text_value: string }>();

  useEffect(() => {
    async function allLinks() {
      let allLinks: Link[] = (await axios.get(`${API}/links`)).data.links;
      setLinks(allLinks);
      setStatus("DONE");
      setUpdatingLink(false);
    }
    allLinks();
  }, []);

  const updateLinksState = async () => {
    try {
      const response = await axios.get(`${API}/links`);
      const allLinks: Link[] = response.data.links;
      setLinks(allLinks);
      setStatus("DONE");
    } catch (error) {
      console.log(error);
      setStatus("DONE");
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(search);
    setStatus("LOADING");

    try {
      const response = await axios.post(`${API}/searchLinks`, {
        long_url: search,
      });

      let allLinks: Link[] = response.data.links;
      setLinks(allLinks);
      setStatus("DONE");
      console.log(status);
    } catch (error) {
      console.log(error);
      setStatus("DONE");
    }
  };

  const handleEditClick = (link: Link) => {
    setSelectedLink(link);
    setShowEditModal(true);
  };

  const handleUpdateLink = async (newShortUrl: string) => {
    if (selectedLink) {
      try {
        setUpdatingLink(true);
        setShowEditModal(false);
        const response = await axios.post(`${API}/updateLink`, {
          _id: selectedLink._id,
          short_url: selectedLink.short_url,
          new_short_url: newShortUrl,
        });

        console.log(response.status);
        updateLinksState();

        if (response.status === 200) {
          setSuccessUpdate(response.data.message); 
          setErrorResponse(null); 
          // Set the success message
          setErrorMessage(null); // Clear the error message
        } else if (response.status === 400) {
          setErrorMessage(response.data.message);
          setErrorResponse(response.data.message);
          setSuccessUpdate("");
          setSuccessMessage(null); // Clear the success message
        }
        else if(response.status === 404)
        {
          setErrorMessage(response.data.message);
          setErrorResponse(response.data.message);
          setSuccessUpdate("");
          setSuccessMessage(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setUpdatingLink(false);
        setShowEditModal(false);
        setSelectedLink(null);
        setTimeout(()=>{
          setSuccessUpdate("");
          setErrorResponse(null);
        },8000)
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(newLink);
    var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(newLink);
    if (valid) {
      try {
        setGeneratingShortLink(true);
        const response = await axios.post(`${API}/link`, {
          long_url: newLink,
        });
        setSuccessGeneration("Your Short Link is:  " + "stan.ly/" + response.data.link.short_url);
        setTimeout(()=>{
          setSuccessGeneration("");
        },5000)
        console.log(response.data);
        updateLinksState();
        setValidationError("");
      } catch (error) {
        console.log(error);
      }
      finally
      {
        setGeneratingShortLink(false);
      }
    } else {
      setValidationError("Invalid URL. Please enter a valid URL.");
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filterSearchList = (title: string) => {
    if (title) {
      setSearch(title);
    } else {
      setSearch("");
    }
  };

  const filteredLinks = links.filter(
    (t) =>
      t.long_url.toLowerCase().includes(search.toLowerCase()) ||
      t.short_url.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = filteredLinks.slice(indexOfFirstLink, indexOfLastLink);

  const customStyles = {
    rows: {
      style: {
        background: "#0e0e19",
        color: "white",
        marginTop: "-1px",
        // fontSize: "13px",
        alignItems: "center",
      },
    },
    headCells: {
      style: {
        color: "white",
        background: "#0e131e",
        // paddingLeft: "10px", // override the cell padding for head cells
        // paddingRight: "10px",
        fontSize: "18px",
        fontWeight: "bold",
        alignItems: "center",
        // padding: "25px 0px 20px 37px", 
        padding: "20px",
      },
    },
    cells: {
      style: {
        paddingLeft: "12px", // override the cell padding for data cells
        paddingRight: "8px",
        alignItems: "center",
        margin: "20px",
      },
    },
  };

  return (
    <Styles>
      <MainPage />
      <div className="home">
        <table className="form_tab">
          <tr>
            <td>
              <div className="input-container">
              <form>
                <input
                  type="text"
                  name="newLink"
                  placeholder="Enter the link here"
                  onChange={(e) => {
                    setNewLink(e.target.value);
                    setValidationError("");
                  }}
                  required
                />
                <img src={image} alt="Link Icon" />
                <button type="submit" onClick={handleSubmit}>
                  Shorten Now!
                </button>
                {shortUrl && <p>Short URL: {shortUrl}</p>}
                <br />
              </form>
              </div>
              
            </td>
            <td width={"50%"}>
              <form>
                <input
                  type="text"
                  name="newLink"
                  placeholder="Enter the Search URL here"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  required
                />
                <img src={search_img} alt="Link Icon" />
                <button type="submit" onClick={handleSearch}>
                  Search!
                </button>
                <br />
              </form>
              {/* <Search onFilter={filterSearchList} /> */}
            </td>
          </tr>
        </table>

        {/* //Search Bar */}
        {/* <Search onFilter={filterSearchList} /> */}
        <br></br>
        <span>{validationError && <p className="error-message">{validationError}</p>}</span>
        <span>{successGeneration && <p className="success-message">{successGeneration}</p>}</span>
        <span>{errorResponse && <p className="error-message">{errorResponse}</p>}</span>
        <span>{successUpdate && <p className="success-update-message">{successUpdate}</p>}</span>
        <div hidden={status !== "LOADING" && !updatingLink && !generatingShortLink}>
          <Spinner
            animation="border"
            style={{
              color: "white",
              width: "75px",
              height: "75px",
              position: "relative",
              left: "49%",
              right: "50%",
            }}
          />
        </div>
        <div hidden={status === "LOADING" || updatingLink || generatingShortLink} style={{ margin: "40px" }}>
          {/* <LinksTable links={links} /> */}

          <DataTable
            data={links}
            customStyles={customStyles}
            columns={[
              {
                name: "Original URL",
                selector: (row) => row.long_url,
              },
              {
                name: "Short URL",
                selector: (row) => "stan.ly/" + row.short_url,
              },
              {
                name: "Creation Date",
                selector: (row) => new Date(row.creation_date).toLocaleString(),
              },
              // {
              //   name: "IP Address",
              //   selector: (row) => row.ip_address,
              // },
              {
                name: "Edit",
                cell: (row) => (
                  <button style={{marginLeft:"-4px"}}onClick={() => handleEditClick(row)}>✎</button>
                ),
              },
            ]}
            direction={Direction.AUTO}
            fixedHeaderScrollHeight="100px"
            pagination
            responsive
            subHeaderAlign={Alignment.CENTER}
            subHeaderWrap
          />

          {/* <div hidden={!updatingLink}>
            
            <Spinner
              animation="border"
              style={{
                color: "white",
                width: "75px",
                height: "75px",
                position: "relative",
                left: "49%",
                right: "50%",
              }}
            />
          </div> */}
        </div>

        {showEditModal && (
          <EditModal
            link={selectedLink}
            onClose={() => {
              setShowEditModal(false);
              setSelectedLink(null);
              setErrorMessage(null);
              setSuccessMessage(null); // Clear error message when modal is closed
            }}
            onUpdate={handleUpdateLink}
            errorMessage={errorMessage}
            successMessage={successMessage} // Pass error message
            show={showEditModal}
          />
        )}
      </div>
    </Styles>
  );
};

export default Home;
