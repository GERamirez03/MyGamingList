import React, { useContext } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { sendUserCredentialsToApi } from "./actionCreators";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";
import UserContext from "./userContext";
import { returningUser } from "./schemas";

function LoginForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const apiHelper = useContext(UserContext);

    const handleSubmit = values => {
        dispatch(sendUserCredentialsToApi(values, apiHelper));
        navigate('/');
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: returningUser,
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

                <Button type="submit" variant="contained">Submit</Button>
            </Stack>
        </Box>
    );
};

export default LoginForm;