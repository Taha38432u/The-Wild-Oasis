import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Logo from "../ui/Logo.jsx";
import Heading from "../ui/Heading.jsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  padding: 2rem;
  background-color: var(--color-grey-50);

  /* Responsive styles */
  @media (max-width: 768px) {
    grid-template-columns: 100%;
    padding: 1.6rem;
  }

  @media (max-width: 480px) {
    gap: 2.4rem;
    padding: 1.2rem;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
