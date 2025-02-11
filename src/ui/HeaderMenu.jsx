import styled from "styled-components";
import ButtonIcon from "./ButtonIcon.jsx";
import { HiOutlineUser } from "react-icons/hi";
import Logout from "../features/authentication/Logout.jsx";
import { useNavigate } from "react-router-dom";

function HeaderMenu() {
  const navigate = useNavigate();
  const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
  `;
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
