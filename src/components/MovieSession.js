import axios from "axios";
import styled from "styled-components";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MovieSession = () => {

    const { idMovie } = useParams();
    const [movieSessionData, setMovieSessionData] = React.useState(null);

    useEffect(() => {
        const movieSessionPromise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`);
        movieSessionPromise.then(response => { setMovieSessionData(response.data) })
    }, [idMovie])

    if (movieSessionData === null) {
        return "Loading";
    }

    return (
        <>
            <MovieSessionContainer>
                <h1>Selecione o horário</h1>
                <SessionTime>
                    {movieSessionData.days.map((element) =>
                        <SessionTimeDate key={element.id}>
                            <h2>{element.weekday} - {element.date}</h2>
                            <SessionTimeHourContainer>
                                {element.showtimes.map(e =>
                                    <Link to={`/assentos/:idSessao`} >
                                        <SessionHour>{e.name}</SessionHour>
                                    </Link>
                                )}
                            </SessionTimeHourContainer>
                        </SessionTimeDate>
                    )}
                </SessionTime>
                <Footer>
                    <img src={movieSessionData.posterURL} alt='poster' />
                    <h1>{movieSessionData.title}</h1>
                </Footer>
            </MovieSessionContainer>
        </>

    )
}

const MovieSessionContainer = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    h1{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 110px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: 4%;
        color: #293845;
    }
`
const SessionTime = styled.ul`
    width: 100%;
    display: block;
    margin-left: 25px;
    h2{
        width: 100%;
        min-height: 35px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 2%;
        color: #293845; 
    }

`
const SessionTimeDate = styled.section`
`
const SessionTimeHourContainer = styled.section`
    display: flex;

`
const SessionHour = styled.section`
    width: 82px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#E8833A;
    border-radius: 3px;
    margin: 23px 9px 23px 0px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 2%;
    color:#FFFFFF;
    
`

const Footer = styled.footer`
    width: 100%;
    height: 117px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #9EADBA;
    border: 1px solid #9EADBA;
    h1{
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
export default MovieSession;