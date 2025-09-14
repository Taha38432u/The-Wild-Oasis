// Sidebar.jsx
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader.jsx";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 24rem;
    height: 100%;
    background-color: var(--color-grey-0);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    transform: ${(props) =>
      props.isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
`;

function Sidebar({ isOpen, onClose }) {
  const ref = useOutsideClick(onClose);

  return (
    <StyledSidebar ref={ref} isOpen={isOpen}>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
