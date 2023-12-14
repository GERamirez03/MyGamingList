import { object, string } from "yup";

const newUser = object({
    username: string().min(3, "Must be 3 characters or more").max(15, "Must be 15 characters or less").required("Required"),
    password: string().min(8, "Must be 8 characters or more").max(20, "Must be 20 characters or less").required("Required"),
    email: string().email("Invalid email address").required("Required")
});

const returningUser = newUser.omit(['email']);

export { newUser, returningUser };