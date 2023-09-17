import React from "react";

type Link = {
    long_url: string;
    short_url: string;
  };

type LinkTableProps = {
  links: Link[];
};

const LinksTable: React.FC<LinkTableProps> = ({ links }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Original URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {links.length > 0 ? (
          links.map((link, index) => (
            <tr key={index}>
              <td>{link.long_url}</td>
              <td>
                <a href={link.short_url} target="_blank" rel="noopener noreferrer">
                  stan.ly/{link.short_url}
                </a>
              </td>
              <td>{Math.floor(Math.random() * 100)}</td>
              <td>May - 23 - 2023</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No Data Available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default LinksTable;
