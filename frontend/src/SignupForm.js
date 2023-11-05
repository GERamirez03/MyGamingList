import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { sendNewUserToApi } from "./actionCreators";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";

function SignupForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = values => {
        dispatch(sendNewUserToApi(values));
        navigate('/');
    }

    // async function handleSubmit(values) {
    //     dispatch(sendNewUserToApi(values));
    //     navigate('/');
    // }

    // potentially share validation schema across forms?
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            password: Yup.string() // investigate regex for password validation
                .max(20, "Must be 20 characters or less")
                .min(8, "Must be 8 characters or more")
                .required("Required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Required")
        }),
        onSubmit: values => {
            handleSubmit(values);
            // alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >

                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <Button type="submit" variant="contained">Submit</Button>
            </Stack>
        </Box>
    );
};

export default SignupForm;