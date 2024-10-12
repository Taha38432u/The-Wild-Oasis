import Stat from "./Stat.jsx";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers.js";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
  const checkdins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, booking) => acc + booking.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
        color="blue"
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
        color="green"
      />
      <Stat
        title="Check ins"
        value={checkdins}
        icon={<HiOutlineCalendarDays />}
        color="indigo"
      />
      <Stat
        title="Occupancy Rate"
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
        color="yellow"
      />
    </>
  );
}

export default Stats;
