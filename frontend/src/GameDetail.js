import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyGamingListApi from "./api";

function GameDetail() {

    const [isLoading, setIsLoading] = useState(true);
    const [game, setGame] = useState(null);

    const { thingToSearchGameBy } = useParams();

    /** Attempt to find that game, else redirect */
    // We're going to base the url's by either slugs from igdb itself so it should be fine...
    // eg '/games/super-mario-galaxy-2'

    /** While loading display loading... */

    /** Important Properties of Game Object 
     * 
     * id, name, slug, checksum (uuid hash of the object)
     * summary, first_release_date (unix time stamp!)
     * ** cover, platforms
     * 
     * ?* age_ratings
     * ?? aggregated_rating, aggregated_rating_count (Aggregated = comes from external critics, averaged by count)
     * ??? storyline
    */

    useEffect();

    // get specific game with "where id = 432432" or similar
}

export default GameDetail;