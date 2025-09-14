import { useMediaQuery } from "react-responsive"; // 👈 from react-responsive
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical.jsx";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSingUp from "./useSignUp.js";

function SignupForm() {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const { isLoading, signUp } = useSingUp();

  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const Row = isMobile ? FormRowVertical : FormRow;

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </Row>

      <Row label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </Row>

      <Row
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          disabled={isLoading}
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </Row>

      <Row label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          disabled={isLoading}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </Row>

      <Row>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </Row>
    </Form>
  );
}

export default SignupForm;
