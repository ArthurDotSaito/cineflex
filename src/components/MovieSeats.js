import axios from "axios";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieSeats = ({userData, setUserData}) =>{
    const { idSessao } = useParams();
    const [seatList, setSeatList] = React.useState([]);
    const [selectedSeats, setSelectedSeats] = React.useState([]);
    console.log(idSessao);

    useEffect(() => {
        const seatListPromise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        seatListPromise.then(response => {setSeatList(response.data); setSelectedSeats(new Array(response.data.seats.length).fill(false))})
        seatListPromise.catch(response => console.log(response))
    }, [idSessao])

    if(seatList.length === 0){
        return "Loading..."
    }
    

    function selectSeat(seatName, seatIsAvailable){

        if(!seatIsAvailable){
            alert("Assento não disponivel!")
            return;
        }if(userData.seats.includes(seatName)){
/*             const seatsSelected = [...userData.seats]
            seatsSelected.splice(userData.seats.indexOf(seatName), 1); */
            const seatsSelected = userData.seats.filter((e) => e !== seatName);
            const newSelectedSeats = [...selectedSeats];
            setUserData(value => ({...value, seats: seatsSelected}));
            newSelectedSeats[seatName] = false;
            setSelectedSeats(newSelectedSeats);
        }else{
            const seatsSelected = [...userData.seats, seatName];
            const newSelectedSeats = [...selectedSeats];
            setUserData(value => ({...value, seats: seatsSelected}));
            newSelectedSeats[seatName] = true;
            setSelectedSeats(newSelectedSeats);
        }
    }

    const ListofSeats = seatList.seats.map((seat) => (
        <SeatsContainer
            key = {seat.id}
            available = {seat.isAvailable}
            isSelected = {selectedSeats[seat.name]}
            onClick = {() => {selectSeat(seat.name, seat.isAvailable)}}
            >{seat.name}
        </SeatsContainer>
    )) 

    return(
        <MovieSeatsContainer>
            <h1>Selecione o(s) assentos</h1>
            <SeatList>{ListofSeats}</SeatList>
        </MovieSeatsContainer>
    )
}
const MovieSeatsContainer = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    h1 {
        height: 100px;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.04em;
        color: #293845;
    }

`

const SeatList = styled.ul`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 5%;
`

const SeatsContainer = styled.button`
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:17px;
    margin: 8px;
    background: ${props => props.available ? "#C3CfD9" : "#FBE192"};
    background: ${props => props.isSelected && "#1AAE9E"};
    border: ${props => props.available ? '1px solid #808F9D' : '1px solid #F7C52B'};
    border: ${props => props.isSelected && '1px solid #0E7D71'};
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 4%;
    color: #000000;
`

export default MovieSeats;