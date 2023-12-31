import React, { useContext } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./userContext";
import { sendUserPostingCommentToApi, sendUserUpdatingCommentToApi } from "./actionCreators";

function CommentForm() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const apiHelper = useContext(UserContext);
    const isEdit = location.state.commentData ? true : false;

    const initialValues = (isEdit)
    ?
    {
        text: location.state.commentData.text,
        author: location.state.commentData.author,
        review_id: location.state.commentData.review_id
    }
    :
    {
        text: "",
        author: apiHelper.username,
        review_id: location.state.reviewId
    };

    const handleSubmit = values => {
        console.debug(values);
        dispatch(sendUserPostingCommentToApi(values, apiHelper));
        navigate(`/reviews/${initialValues.review_id}`);
    }

    const handleEdit = values => {
        console.debug("handleEdit", values);
        dispatch(sendUserUpdatingCommentToApi(location.state.commentData.id, values, apiHelper));
        navigate(`/reviews/${initialValues.review_id}`);
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => (isEdit) ? handleEdit(values) : handleSubmit(values)
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