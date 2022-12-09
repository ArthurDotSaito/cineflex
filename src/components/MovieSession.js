import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieSession = () => {

    const {idMovie} = useParams();
    const [movieSection, setMovieSection] = React.useState("");

    useEffect(() =>{
        const movieSessionPromise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies/ID_DO_FILME/showtimes");
        movieSessionPromise.then(response => {setMovieSection(response.data)})
    }, [idMovie])

}

export default MovieSession;