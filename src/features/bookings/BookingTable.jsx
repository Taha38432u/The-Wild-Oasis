import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table>
        {/* Table header */}
        <Table.Header>
          <th>Cabin</th>
          <th>Guest</th>
          <th>Dates</th>
          <th>Status</th>
          <th>Amount</th>
          <th></th>
        </Table.Header>

        {/* Table body */}
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Pagination count={count} />
    </Menus>
  );
}

export default BookingTable;
