import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";
import { useMediaQuery } from "react-responsive";

function Bookings() {
  const isMobile = useMediaQuery({ maxWidth: 1024 }); // adjust width as needed
  return (
    <>
      <Row type={isMobile ? "vertical" : "horizontal"}>
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
