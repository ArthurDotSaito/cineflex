import axios from "axios";
import styled from "styled-components";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const MovieSeats = ({userData, setUserData}) =>{
    const { idSessao } = useParams();
    const [seatList, setSeatList] = React.useState([]);
    const [seatListID, setSeatListID] = React.useState([]);
    const [selectedSeats, setSelectedSeats] = React.useState([]);
    const [selectSeatsIDS, setSelectedSeatsID] = React.useState([]);

    useEffect(() => {
        const seatListPromise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        seatListPromise.then(response => {setSeatList(response.data); setSelectedSeats(new Array(response.data.seats.length).fill(false))})
        seatListPromise.catch(response => console.log(response))
    }, [idSessao])

    if(seatList.length === 0){
        return "Loading..."
    }
    
      function selectSeat(seatName, seatIsAvailable, seatID){
        if(!seatIsAvailable){
            alert("Assento não disponivel!");
            return;
        }
        if(userData.seats.includes(seatName)){
            const seatsSelected = [...userData.seats];
            const seatsSelectedID = [...seatListID];
            seatsSelected.splice(userData.seats.indexOf(seatName), 1)
            seatsSelectedID.splice(userData.seats.indexOf(seatID), 1)
            setUserData((values) =>({...values, seats: seatsSelected}))
            setSeatListID(seatsSelectedID);
            const newSelectedSeats = [...selectedSeats];
            newSelectedSeats[seatName - 1] = false;
            setSelectedSeats(newSelectedSeats);
        }else{
            const seatsSelected = [...userData.seats, seatName];
            const seatsSelectedID = [...seatListID, seatID];
            setUserData((values) =>({...values, seats: seatsSelected}));
            setSeatListID(seatsSelectedID);
            const newSelectedSeats = [...selectedSeats];
            newSelectedSeats[seatName - 1] = true;
            setSelectedSeats(newSelectedSeats);
        }
      }

    const ListofSeats = seatList.seats.map(seat => (
        <SeatsContainer
            key = {seat.id}
            available = {seat.isAvailable}
            isSelected = {selectedSeats[seat.name - 1]}
            onClick = {() => {selectSeat(seat.name, seat.isAvailable, seat.id)}}
            cursor={true}
            data-test="seat"
            >{seat.name}
        </SeatsContainer>
    )) 

    function MakeReserve(){
        const reserveDetails = {
            ids: seatListID,
            name: userData.userName,
            cpf: userData.userDocument
        }

        const reserve = axios.post(`https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`, reserveDetails);
        reserve.then(() => {setUserData(values => ({...values, reserved: true}))});
    }

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
                            onChange={(element) => setUserData(values => ({ ...values, userName: element.target.value }))}
                            data-test="client-name">
                        </input>
                        <h1>CPF do comprador</h1>
                        <input
                            type='number'
                            value={userData.userDocument}
                            placeholder="Digite o seu CPF..."
                            onChange={(element) => setUserData(values => ({ ...values, userDocument: element.target.value }))}
                            data-test="client-cpf">
                        </input>
                    </form>
            </InputContainer>
            <ReserveContainer to="/sucesso">
                <ReserveButton
                    onClick={() => MakeReserve()}
                    disabled={((userData.userName === ''||userData.userDocument.length < 7||userData.seats.length === 0) && true)}
                    data-test="book-seat-btn">
                    Reservar assento(s)
                </ReserveButton>
            </ReserveContainer>
            <Footer data-test="footer">
                <img src={userData.movieSelected.posterURL} alt='poster' />
                <SessionDetailsContainer>
                    <h1>{userData.movieSelected.title}</h1>
                    <h1>{userData.day} {userData.hour}</h1>
                </SessionDetailsContainer>
            </Footer>
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
    margin-bottom: 150px;
    cursor: pointer;
`
const Footer = styled.footer`
    width: 100%;
    height: 117px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #9EADBA;
    border: 1px solid #9EADBA;
    margin-left: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    h1{
        height: 40px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
    }
    img{
        height: 100px;
        margin-left: 10px;
    }
`

const SessionDetailsContainer=styled.section`
    width: 290px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
`
export default MovieSeats;