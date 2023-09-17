import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 80%;
    max-width: 400px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  .error-message,
  .success-message {
    font-size: 14px;
    color: red; /* or green for success */
    margin-bottom: 10px;
  }

  button {
    background-color: #008cfa;
    color: #fff;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  button:hover {
    background-color: #0072c3;
  }

  button:last-child {
    background-color: #ddd;
    color: #333;
  }

  .error-message {
    font-size: 14px;
    color: red;
    margin-top: 10px; /* Add margin at the top to separate from other content */
    text-align: center; /* Center the error message */
  }
`;


type Link = {
    _id: string;
    long_url: string;
    short_url: string;
  };
  
  type EditModalProps = {
    show: boolean; 
    link: Link | null;
    onClose: () => void;
    onUpdate: (newShortUrl: string) => void;
    errorMessage?: string | null;
    successMessage?: string | null;
  };
  
  const EditModal: React.FC<EditModalProps> = ({ show, onClose, onUpdate, link, errorMessage, successMessage }) => {
    const [newShortUrl, setNewShortUrl] = useState(link ? link.short_url : "");
    const long_url = link?.long_url;
    console.log(long_url)
    const handleUpdateClick = () => {
      if (link && link.short_url !== newShortUrl) {
        onUpdate(newShortUrl);
        

      }
    };
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Short URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Long URL:  &nbsp;&nbsp;&nbsp;
          <input style={{width: "65%"}}
            type="text"
            value={long_url}
            disabled
          />
        
            <br/><br/>
            Short URL:  &nbsp;&nbsp;&nbsp;
            
          stan.ly/<input style={{width: "52%"}}
            type="text"
            value={newShortUrl}
            onChange={(e) => setNewShortUrl(e.target.value)}
          />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateClick}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default EditModal;