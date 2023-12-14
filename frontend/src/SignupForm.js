import React, { useContext } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { sendNewUserToApi } from "./actionCreators";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";
import UserContext from "./userContext";
import { newUser } from "./schemas";

function SignupForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const apiHelper = useContext(UserContext);

    const handleSubmit = values => {
        dispatch(sendNewUserToApi(values, apiHelper));
        navigate('/');
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: ""
        },
        validationSchema: newUser,
        onSubmit: values => {
            handleSubmit(values);
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