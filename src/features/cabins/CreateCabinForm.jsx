import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import FormRowVertical from "../../ui/FormRowVertical";
import useInsertCabin from "./useInsertCabin.js";
import useEditCabin from "./useEditCabin.js";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // Insert Cabin
  const { isInserting, insertCabin } = useInsertCabin();

  // Edit Cabin
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isInserting || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      insertCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  function onError(errors) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? `modal` : `regular`}
    >
      <FormRowVertical label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register(`name`, {
            required: "This field is required",
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register(`maxCapacity`, {
            required: "This field is required",
            min: {
              value: 1,
              message: `Capacity should be at least 1`,
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Regular Price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register(`regularPrice`, {
            required: "This field is required",
            min: {
              value: 1,
              message: `Capacity should be at least 1`,
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register(`discount`, {
            required: "This field is required",
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register(`description`, {
            required: "This field is required",
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          onClick={() => onCloseModal?.()}
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isWorking
            ? "Inserting..."
            : `${isEditSession ? `Edit Cabin` : `Insert cabin`}`}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default CreateCabinForm;
