import styled from "styled-components";
import { createContext, useContext } from "react";

const TableContext = createContext();

// Wrapper to enable horizontal scrolling on small screens
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

// Semantic table styles
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* ensures table has a minimum width */
`;

// Table header styles
const StyledThead = styled.thead`
  background-color: var(--color-grey-50);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

// Table body styles
const StyledTbody = styled.tbody`
  & > tr:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

// Table row styles
const StyledTr = styled.tr`
  & > th,
  & > td {
    padding: 1.2rem 2.4rem;
    text-align: left;
    white-space: nowrap;
  }
`;

// Optional footer
const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

// Empty state
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// Table component
function Table({ children }) {
  return (
    <TableWrapper>
      <TableContext.Provider value={{}}>
        <StyledTable>{children}</StyledTable>
      </TableContext.Provider>
    </TableWrapper>
  );
}

// Table.Header component
function Header({ children }) {
  return (
    <StyledThead>
      <StyledTr>{children}</StyledTr>
    </StyledThead>
  );
}

// Table.Row component
function Row({ children }) {
  return <StyledTr>{children}</StyledTr>;
}

// Table.Body component
function Body({ data, render }) {
  if (!data || data.length === 0) {
    return <Empty>No data available</Empty>;
  }
  return <StyledTbody>{data.map(render)}</StyledTbody>;
}

// Attach subcomponents
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
