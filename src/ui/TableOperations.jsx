import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 768px) {
    align-items: start;
    flex-direction: column; /* name spans full width */
  }
`;

export default TableOperations;
