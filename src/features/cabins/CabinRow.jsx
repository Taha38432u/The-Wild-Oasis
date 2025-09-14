import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import useDeleteCabin from "./useDeleteCabin.js";
import useInsertCabin from "./useInsertCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  min-width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

const CabinName = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono", sans-serif;
`;

const Price = styled.span`
  font-family: "Sono", sans-serif;
  font-weight: 600;
`;

const Discount = styled.span`
  font-family: "Sono", sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    maxCapacity,
    name,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  console.log(cabin);

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { insertCabin } = useInsertCabin();

  function handleDuplicate() {
    insertCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <td>
        <Img src={image} alt={name} />
      </td>
      <td>
        <CabinName>{name}</CabinName>
      </td>
      <td>Fits up to {maxCapacity} guests</td>
      <td>
        <Price>{formatCurrency(regularPrice)}</Price>
      </td>
      <td>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
      </td>
      <td>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </td>
    </Table.Row>
  );
}

export default CabinRow;
