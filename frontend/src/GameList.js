import React, { useState, useEffect, useContext } from "react";
import SearchForm from "./SearchForm";
import GameCard from "./GameCard";
import UserContext from "./userContext";
import { Stack } from '@mui/material';

function GameList() {

    const apiHelper = useContext(UserContext);

    const [searchFormData, setSearchFormData] = useState(null);
    const [gamesArr, setGamesArr] = useState(null);

    const search = searchFormData => {
        setSearchFormData(searchFormData);
    };

    useEffect(() => {
        async function getGameData(searchFormData) {
            let games = await apiHelper.searchGames(searchFormData);
            setGamesArr(games);
        }
        getGameData(searchFormData);
    }, [searchFormData])

    return (
        <>
            <SearchForm search={search} />
            <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                {gamesArr !== null && gamesArr.map(game => <GameCard game={game} url={game.cover ? game.cover.url : null} key={game.checksum} />)}
            </Stack>
        </>
    );
}

export default GameList;