import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
const [moviesPostList, setMoviesPostList] = React.useState(undefined);

useEffect(() => {
    const movieListPromise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
    movieListPromise.then(response => {setMoviesPostList(response.data);});
}, [])

if(!moviesPostList){
    return(
        <MovieListContainer>Loading...</MovieListContainer>
    )
}

return(
    <MovieListContainer>
        <h1>Selecione o filme</h1>
       <MovieListSection>
        {moviesPostList.map((moviePost) =>(
            <MoviePost key={moviePost.id}>
                <Link to={`/sessoes/${moviePost.id}`}>
                    <img 
                        src = {moviePost.posterURL} alt="movie-post-link">
                    </img>
                </Link>
            </MoviePost>
        ))}
        </MovieListSection>
    </MovieListContainer>
)

}

const MovieListContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

const MovieListSection = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

`

const MoviePost = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 145px;
    height: 209px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom:20px ;
    img{
        width: 129px;
        height: 193px;
    }


`
export default Movies;