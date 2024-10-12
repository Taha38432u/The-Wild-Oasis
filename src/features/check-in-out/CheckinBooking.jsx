import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking.js";
import Checkbox from "../../ui/Checkbox.jsx";
import Spinner from "../../ui/Spinner.jsx";
import { useEffect, useState } from "react";
import useCheckIn from "./useCheckIn.jsx";
import useSettings from "../settings/useSettings.js";
import { formatCurrency } from "../../utils/helpers.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading: isSettingLoading, settings } = useSettings();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkIn, isCheckingIn } = useCheckIn();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isSettingLoading) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const settingBreakfastPrice = settings.breakfastPrice;

  const breakfastPrice = settingBreakfastPrice * numGuests * numNights;
  function handleCheckin() {
    const finalPrice = totalPrice + breakfastPrice;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          extrasPrice: breakfastPrice,
          totalPrice: finalPrice,
          hasBreakfast: true,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
          >{`Want to add breakfast for ${formatCurrency(settingBreakfastPrice)} `}</Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          {!addBreakfast
            ? `I confirm that ${guests.fullName} has paid the total amount ${formatCurrency(totalPrice)} `
            : `I confirm that ${guests.fullName} has paid the total amount ${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(breakfastPrice)}) `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
