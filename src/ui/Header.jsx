import styled from "styled-components";
import Logout from "../features/authentication/Logout.jsx";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/authentication/UserAvatar.jsx";
import { FaBars } from "react-icons/fa";

const StyledHeader = styled.header`
  // grid-column: 1 / -1;
  background-color: var(--color-grey-0);
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    position: sticky;
    top: 0;
    z-index: 1100;
  }

  @media (min-width: 1024px) {
    justify-content: end;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: block;
  }
`;

function Header({ onToggleSidebar }) {
  return (
    <StyledHeader>
      {/* Left side: Hamburger button (only on mobile) */}
      <HamburgerButton onClick={onToggleSidebar}>
        <FaBars size={22} />
      </HamburgerButton>

      {/* Right side: user section */}
      <RightSection>
        <UserAvatar />
        <HeaderMenu />
      </RightSection>
    </StyledHeader>
  );
}

export default Header;
