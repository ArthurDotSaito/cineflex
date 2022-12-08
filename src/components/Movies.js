import axios from "axios";
import styled from "styled-components";
import React from "react";
import { useEffect } from "react";

const Movies = () => {
const [moviesPostList, setMoviesPostList] = React.useState("");

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
                <img 
                    src = {moviePost.posterURL} alt="movie-post-link">
                </img>
            </MoviePost>
        ))}
        </MovieListSection>
    </MovieListContainer>
)

}

const MovieListContainer = styled.main`
`

const MovieListSection = styled.ul`
`

const MoviePost = styled.li`

`
export default Movies;