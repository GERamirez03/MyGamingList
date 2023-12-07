import React, { useState, useEffect, useContext } from "react";
import SearchForm from "./SearchForm";
import GameCard from "./GameCard";
import UserContext from "./userContext";

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
            {gamesArr !== null && gamesArr.map(game => <GameCard game={game} key={game.checksum} />)}
        </>
    );
}

export default GameList;