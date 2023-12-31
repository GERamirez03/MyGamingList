import React, { useContext } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { sendNewReviewToApi, sendUserUpdatingReviewToApi } from "./actionCreators";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";
import UserContext from "./userContext";

function ReviewForm() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const apiHelper = useContext(UserContext);
    const isEdit = location.state.reviewData ? true : false;

    const initialValues = (isEdit)
    ?
    {
        game_id: location.state.reviewData.game_id,
        game: `Editing review ${location.state.reviewData.title}`,
        author: location.state.reviewData.author,
        title: location.state.reviewData.title,
        description: location.state.reviewData.description,
        body: location.state.reviewData.body
    }
    :
    {
        game_id: location.state.gameId,
        game: location.state.name,
        author: apiHelper.username,
        title: "",
        description: "",
        body: ""
    }

    const handleSubmit = values => {
        console.debug(values);
        dispatch(sendNewReviewToApi(values, apiHelper));
        navigate("/reviews");
    }

    const handleEdit = values => {
        console.debug("handleEdit", values);
        dispatch(sendUserUpdatingReviewToApi(location.state.reviewData.id, values, apiHelper));
        navigate("/reviews");
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
                    id="game"
                    name="game"
                    label="Game"
                    variant="standard"
                    value={formik.values.game}
                    disabled
                />

                <TextField
                    id="author"
                    name="author"
                    label="Author"
                    variant="filled"
                    value={formik.values.author}
                    disabled
                />

                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    variant="standard"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />

                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="filled"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                
                <TextField
                    id="body"
                    name="body"
                    label="Body"
                    variant="outlined"
                    multiline
                    rows={10}
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                />

                <Button type="submit" variant="contained">Post</Button>
            </Stack>
        </Box>
    );
}

export default ReviewForm;