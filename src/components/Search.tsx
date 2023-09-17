import { useState } from "react";
import search from "../images/search.png";
import { default as styled } from "styled-components";

const Styles = styled.div`
  .search-container {

    input {
      display: flex;
      flex-direction: row;
      // border: 1px solid white;
      width: 50%;
      margin: auto;
      padding: auto;
      position: relative;
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
  }
`;

type SearchProps = {
  onFilter: (title: string) => void;
};

const Search = ({ onFilter }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () =>{
    onFilter(searchTerm)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <Styles>
    <div className="search-container">
      <input
        type="text"
        name="searchbar"
        value={searchTerm}
        placeholder="Enter the SearchURL "
        required
        onChange={handleChange}
      />
      <img className="search" src={search} alt="Search Icon"></img>
      <button type="submit" onClick={handleSearch}>Search!</button>
    </div>
    </Styles>
  );
};

export default Search;
