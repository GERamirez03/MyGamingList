import React, { useState, useEffect } from "react";
import MyGamingListApi from "./api";
import SearchForm from "./SearchForm";
import GameCard from "./GameCard";

function GameList() {

    const [searchFormData, setSearchFormData] = useState(null);
    const [gamesArr, setGamesArr] = useState(null);

    const search = searchFormData => {
        setSearchFormData(searchFormData);
    };

    useEffect(() => {
        async function getGameData(searchFormData) {
            let apiHelper = new MyGamingListApi();
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