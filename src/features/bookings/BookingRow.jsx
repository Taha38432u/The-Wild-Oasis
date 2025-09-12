import styled from "styled-components";
import { format, isToday, differenceInDays } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus.jsx";
import { useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import useDeleteBooking from "./useDeleteBooking.js";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { checkOut, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  // Ensure dates are valid
  const start = new Date(startDate);
  const end = new Date(endDate);
  const nights = differenceInDays(end, start) || numNights;

  return (
    <Table.Row>
      <td>
        <Cabin>{cabinName}</Cabin>
      </td>

      <td>
        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>
      </td>

      <td>
        <Stacked>
          <span>
            {isToday(start) ? "Today" : `${format(start, "MMM dd yyyy")}`}{" "}
            &rarr; {nights} night{nights > 1 ? "s" : ""}
          </span>
          <span>
            {format(start, "MMM dd yyyy")} &mdash; {format(end, "MMM dd yyyy")}
          </span>
        </Stacked>
      </td>

      <td>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      </td>

      <td>
        <Amount>{formatCurrency(totalPrice)}</Amount>
      </td>

      <td>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                onClick={() => navigate(`/bookings/${bookingId}`)}
                icon={<HiEye />}
              >
                See Details
              </Menus.Button>

              {status === "unconfirmed" && (
                <Menus.Button
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                  icon={<HiArrowDownOnSquare />}
                >
                  Check in
                </Menus.Button>
              )}

              {status === "checked-in" && (
                <Menus.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkOut(bookingId)}
                  disabled={isCheckingOut}
                >
                  Check out
                </Menus.Button>
              )}

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() => deleteBooking(bookingId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </td>
    </Table.Row>
  );
}

export default BookingRow;
