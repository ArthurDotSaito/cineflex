import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const EndPage = ({userData, setUserData}) =>{
    console.log(userData.reserved);
    if (!userData.reserved) {
        return "loading...";
    }

    return(
        <EndPageContainer>
            <h1>Pedido feito com sucesso!</h1>
            <MovieAndSessionContainer>
                <h1>Filme e sessão</h1>
                <h3>{userData.movieSelected.title}</h3>
                <h3>{userData.day} {userData.hour}</h3>
            </MovieAndSessionContainer>
            <TicketDetailContainer>
                <h1>Ingresso(s)</h1>
                {userData.seats.map((seat) => (
                    <h3 key={seat}>Assento {seat}</h3>
                ))}
            </TicketDetailContainer>
            <UserNameBuyerContainer>
                <h1>Comprador</h1>
                <h3>Nome: {userData.userName}</h3>
                <h3>CPF:{userData.userDocument}</h3>
            </UserNameBuyerContainer>
            <ReturnToHomeContainer
                to="/"
                onClick={() => {
                    setUserData({movieSelected: "", day:"", hour:"", seats:[], userName:[], userDocument:[], reserved:false})
                }}>
                <ReturnToHomeButton>Voltar para home</ReturnToHomeButton>
            </ReturnToHomeContainer>
        </EndPageContainer>
    )
}

const EndPageContainer=styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 25px ;
    h1{
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 4%;
        color: #247A6B;
    }
    h3{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 4%;
        color: #293845;
    }

`
const MovieAndSessionContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    h1{
        height: 50px;
        display: flex;
        justify-content: flex-start;
        color:#293845
    }

`

const TicketDetailContainer = styled.section`
    width: 100%;
    display: flex;
    height: 110px;
    flex-direction: column;
    h1{
        height: 50px;
        display: flex;
        justify-content: flex-start;
        color:#293845
    }
`

const UserNameBuyerContainer = styled.section`
    width: 100%;
    display: flex;
    height: 110px;
    flex-direction: column;
    h1{
        height: 50px;
        display: flex;
        justify-content: flex-start;
        color:#293845
    }
`

const ReturnToHomeContainer = styled(Link)`
`

const ReturnToHomeButton = styled.button`
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
    margin-top: 60px;
    cursor: pointer;

`
export default EndPage;