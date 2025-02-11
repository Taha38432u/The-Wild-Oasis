// import styled from "styled-components";
//
// import Input from "../../ui/Input";
// import Form from "../../ui/Form";
// import Button from "../../ui/Button";
// import FileInput from "../../ui/FileInput";
// import Textarea from "../../ui/Textarea";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { createCabin } from "../../services/apiCabins.js";
// import FormRow from "../../ui/FormRow.jsx";
//
// function CreateCabinForm() {
//   const queryClient = useQueryClient();
//
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//
//   const { errors } = formState;
//   const { mutate, isPending } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success(`Cabin inserted successfully`);
//       queryClient.invalidateQueries({
//         queryKey: [`cabins`],
//       });
//       // reset();
//     },
//     onError: () => {
//       toast.error(`Cabin cannot be inserted due to an error`);
//     },
//   });
//
//   function onSubmit(data) {
//     mutate({ ...data, image: data.image[0] });
//   }
//
//   function onError(errors) {}
//
//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           {...register(`name`, {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register(`maxCapacity`, {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: `Capacity should be at least 1`,
//             },
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register(`regularPrice`, {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: `Capacity should be at least 1`,
//             },
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Discount">
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register(`discount`, {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register(`description`, {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow label="Cabin Photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: "This field is required",
//           })}
//         />
//       </FormRow>
//
//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         {/*<Button disabled={isInserting}>Insert cabin</Button>*/}
//         <Button disabled={isPending} type="submit">
//           {isPending ? "Inserting..." : "Insert cabin"}
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }
//
// export default CreateCabinForm;
