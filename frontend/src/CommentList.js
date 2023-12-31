import React, { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import CommentCard from "./CommentCard";


function CommentList({ comments }) {

    const isEmpty = comments.length === 0;

    return (
        <Box>
            {/** CommentList */}
            {
                isEmpty
                ? <Typography variant="p">Be the first to comment!</Typography>
                : comments.map(comment => <CommentCard comment={comment} key={comment.id} />)
            }
        </Box>
    );
}

export default CommentList;