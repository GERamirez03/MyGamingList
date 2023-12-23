import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

function CommentForm({ postComment, reviewId, author}) {

    const handleSubmit = values => {
        postComment(values);
    }

    const formik = useFormik({
        initialValues: {
            text: "",
            review_id: reviewId,
            author: author
        },
        validationSchema: Yup.object({
            text: Yup.string(),
            review_id: Yup.string(),
            author: Yup.string()
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
                    id="author"
                    name="author"
                    label="Author"
                    variant="filled"
                    value={formik.values.author}
                    disabled
                />
                
                <TextField
                    id="text"
                    name="text"
                    label="Comment"
                    variant="outlined"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.text && Boolean(formik.errors.text)}
                    helperText={formik.touched.text && formik.errors.text}
                />

                <Button type="submit" variant="contained">Post</Button>
            </Stack>
        </Box> 
    );
}

export default CommentForm;