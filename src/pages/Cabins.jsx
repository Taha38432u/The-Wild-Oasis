import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";
import { useMediaQuery } from "react-responsive";

function Cabins() {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  return (
    <>
      <Row type={isMobile ? "vertical" : "horizontal"}>
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
