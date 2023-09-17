import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  .pages {
    .pagination-container {
      display: flex;
      margin-top: 20px;
    }

    ul {
      display: flex;
      justify-content: center;
      list-style: none;
      margin: auto;
      padding: auto;
    }

    li {
      margin: 0 5px;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      color: white;
    }

    .btn-a {
      width: 100%;
      transition: opacity 0.3s ease-in;
    }

    .btn-a:focus {
      background-color: green;
    }
  }
`;

type PaginationProps = {
  currentPage: number;
  linksPerPage: number;
  totalLinks: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination = ({
  currentPage,
  linksPerPage,
  totalLinks,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Math.ceil(totalLinks / linksPerPage);

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <Styles>
      <div className="pages">
        <div className="pagination-container">
          <ul>
            {Array.from({ length: pageNumbers }, (_,index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              return (
                <li key={pageNumber}>
                  <button className="btn-a">
                    <a
                      className={isActive ? "active" : ""}
                      onClick={() => handleClick(pageNumber)}
                    >
                      {pageNumber}
                    </a>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Styles>
  );
};

export default Pagination;
