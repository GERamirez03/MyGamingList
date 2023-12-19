import React, { useContext } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
// import { sendNewReviewToApi } from "./actionCreators";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";
import UserContext from "./userContext";

function ReviewForm() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const apiHelper = useContext(UserContext);

    const { gameId, name } = location.state;

    const handleSubmit = values => {
        // dispatch
        // navigate
        console.debug(values);
    }

    const formik = useFormik({
        initialValues: {
            game_id: gameId,
            game: name,
            author: apiHelper.username,
            title: "",
            description: "",
            body: ""
        },
        onSubmit: values => handleSubmit(values)
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