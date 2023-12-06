import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";

function SearchForm({ search }) {

    const handleSubmit = values => {
        search(values);
    }

    const formik = useFormik({
        initialValues: {
            searchTerm: "",
        },
        validationSchema: Yup.object({
            searchTerm: Yup.string()
        }),
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
                    id="searchTerm"
                    name="searchTerm"
                    label="Search games..."
                    value={formik.values.searchTerm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.searchTerm && Boolean(formik.errors.searchTerm)}
                    helperText={formik.touched.searchTerm && formik.errors.searchTerm}
                />

                <Button type="submit" variant="contained">Search</Button>
            </Stack>
        </Box>
    );
};

export default SearchForm;