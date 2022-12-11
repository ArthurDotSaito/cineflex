import axios from "axios";
import styled from "styled-components";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MovieSeats = ({userData, setUserData}) =>{
    const { idSessao } = useParams();
    const [seatList, setSeatList] = React.useState([]);
    const [selectedSeats, setSelectedSeats] = React.useState([]);

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
            alert("Assento não disponivel!");
            return;
        }if(userData.seats.includes(seatName)){
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
            cursor={true}
            >{seat.name}
        </SeatsContainer>
    )) 

    function makeReserve(){
        const reserveDetails = {
            ids: seatList,
            name: userData.userName,
            cpf:userData.userDocument
        }

        const reserve = axios.post(`https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`, reserveDetails);
        reserve.then(() => {setUserData(values => ({...values, reserved: true}))});
    }

    console.log(userData.reserved)


    return(
        <MovieSeatsContainer>
            <h1>Selecione o(s) assentos</h1>
            <SeatList>{ListofSeats}</SeatList>
            <StatusList>
                <li>
                    <SeatsContainer 
                        isSelected ={true}
                        cursor={false}>  
                    </SeatsContainer>
                    Selecionado
                </li>
                <li>
                    <SeatsContainer 
                        available = {true}
                        cursor={false}>
                    </SeatsContainer>
                    Disponível
                </li>
                <li>
                    <SeatsContainer    
                        available = {false}
                        cursor={false}>
                    </SeatsContainer>
                    Indisponível
                </li>
            </StatusList>
            <InputContainer>
                    <form>
                        <h1>Nome do comprador</h1>
                        <input
                            type='text'
                            value={userData.userName}
                            placeholder="Digite o seu nome..."
                            onChange={(element) => setUserData(values => ({ ...values, userName: element.target.value }))}>
                        </input>
                        <h1>CPF do comprador</h1>
                        <input
                            type='number'
                            value={userData.userDocument}
                            placeholder="Digite o seu CPF..."
                            onChange={(element) => setUserData(values => ({ ...values, userDocument: element.target.value }))}>
                        </input>
                    </form>
            </InputContainer>
            <ReserveContainer to ="/sucesso">
                <ReserveButton
                    onClick={() => makeReserve()}
                    disabled={((userData.userName === ''||userData.userDocument.length < 7||userData.seats.length === 0) && true)}>
                    Reservar assento(s)
                </ReserveButton>
            </ReserveContainer>
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
    width: 450px;
    height: 220px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 5%;
`

const SeatsContainer = styled.button`
    width: 26px;
    height: 26px;
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
    cursor: ${props => (props.cursor) ? "pointer":"default"};
`

const StatusList = styled.ul`
    width: 80%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 1.3%;
    li{
        display: flex;
        flex-direction: column;
        align-items:center
    }
`

const InputContainer = styled.section`
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    input{
        width: 100%;
        height: 50px;
        font-size: 18px;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
    }
`

const ReserveContainer = styled(Link)`
    width: auto;
`

const ReserveButton = styled.button`
    width: 225px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background-color: #E8833A;
    border: none;
    border-radius: 3px;
    margin: 20px;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 4%;
    cursor: pointer;
`

export default MovieSeats;