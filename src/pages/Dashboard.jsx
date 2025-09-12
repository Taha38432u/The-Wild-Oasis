import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";
import { useMediaQuery } from "react-responsive";

function Dashboard() {
  // Define a breakpoint for mobile
  const isMobile = useMediaQuery({ maxWidth: 768 }); // adjust width as needed

  return (
    <>
      <Row type={isMobile ? "vertical" : "horizontal"}>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
