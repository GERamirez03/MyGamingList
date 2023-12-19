import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Paper, Stack, Fab, Rating, Button } from "@mui/material";
import UserContext from "./userContext";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { sendUserAddingGameToApi, sendUserRemovingGameToApi, sendUserRatingGameToApi } from "./actionCreators";
import { useDispatch, useSelector } from "react-redux";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

function GameDetail() {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
    console.log(location.state);
    // location.state.gameId gives the gameId value
    const gameId = location.state.gameId;

    const apiHelper = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState(null);

    const { slug } = useParams();

    const userGameList = useSelector(store => store.games);
    const isInUserGameList = userGameList.includes(gameId);

    /** Have a piece of state dedicated to whether or not a game is already in user's list? that way we can show add vs remove? */

    /** Attempt to find that game, else redirect
     * We're going to base the url's by either slugs from igdb itself so it should be fine...
     * eg '/games/super-mario-galaxy-2'
     */

    /** Important Properties of Game Object 
     * 
     * id, name, slug, checksum (uuid hash of the object)
     * summary, first_release_date (unix time stamp!)
     * ** cover, platforms => **need separate api requests!
     * 
     * ?* age_ratings => ?not sure whether to include
     * ?? aggregated_rating, aggregated_rating_count (Aggregated = comes from external critics, averaged by count)
     * ??? storyline
    */

    useEffect(function fetchGameDataWhenMounted() {
        async function fetchGameData(gameId) {
            let gameRes = await apiHelper.getGameData(gameId);
            setGame(gameRes);
            setIsLoading(false);
        }
        fetchGameData(gameId);
    }, []);

    const dispatch = useDispatch();

    const addGame = () => {
        dispatch(sendUserAddingGameToApi(gameId, apiHelper)); // should a user's games be a set in backend?
    }

    const removeGame = () => {
        dispatch(sendUserRemovingGameToApi(gameId, apiHelper));
    }

    const rateGame = (event, value) => {
        console.log("rateGame!", event, value);
        dispatch(sendUserRatingGameToApi(gameId, value, apiHelper));
    }

    const reviewGame = () => {
        navigate("/reviews/new", { state: { gameId, name }});
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    const { id, name, checksum, summary, first_release_date, cover } = game;

    return (
        <Box sx={{ display: 'flex' }}>
            <Paper>
            <Stack spacing={2}>

                {cover
                ? <Box
                    component="img"
                    src={cover.url}
                    alt={`Cover for ${ name }`}
                    sx={{
                        width: 100,
                        height: 100
                    }}
                  />
                : <ImageNotSupportedIcon fontSize="large" />
                }

                
                    <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                        { name }
                    </Typography>
                
                
                    <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                        { summary }
                    </Typography>
                
                
                    <Typography variant="i" component="div" sx={{ flexGrow: 1 }}>
                        { first_release_date }
                    </Typography>
                

                {isInUserGameList 
                ?   <>
                        <Fab color="secondary" aria-label="remove" onClick={removeGame}>
                            <DeleteIcon />
                        </Fab>
                        <Rating name="user-rating" defaultValue={2.5} precision={0.5} onChange={rateGame} />
                        <Button variant="contained" onClick={reviewGame}>Write a Review</Button>
                    </>
                :   <Fab color="primary" aria-label="add" onClick={addGame}>
                        <AddIcon />
                    </Fab>
                }
            </Stack>
            </Paper>
        </Box>
    );
}

export default GameDetail;