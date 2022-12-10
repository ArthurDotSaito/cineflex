import axios from "axios";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieSeats = ({userData, setUserData}) =>{
    const {idSessao} = useParams();
    const [seatList, setSeatList] = React.useState([]);
    const [selectedSeats, setSelectedSeats] = React.useState([]);

    useEffect(() =>{
        const seatListPromise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        seatListPromise.then(response => 
            {setSeatList(response.data);
            setSelectedSeats(response.data.seats.length).fill(false)
        })
    }, [idSessao])

    if(seatList.length === 0){
        return "Loading..."
    }

}

export default MovieSeats;