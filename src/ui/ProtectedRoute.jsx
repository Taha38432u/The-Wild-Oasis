import useLogIn from "../features/authentication/useLogIn.js";
import styled from "styled-components";
import Spinner from "./Spinner.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser.js";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
