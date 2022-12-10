import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components'
import Header from "./components/Header";
import Movies from './components/Movies';
import MovieSession from './components/MovieSession';
import MovieSeats from './components/MovieSeats';
import GlobalStyle from './styles/globalStyles';


function App() {
  const [userData, setUserData] = React.useState({movieSelected: "", day:"", hour: "", seats:[], userName:[], useDocument:[]})

  return (
    <BrowserRouter>
      <AppMainContainer>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
        <Routes>
          <Route 
            path="/" 
            element={<Movies 
              setUserData={setUserData}>  
              </Movies>}>
          </Route>
          <Route 
            path="/sessoes/:idMovie" 
            element={<MovieSession 
              userData={userData} 
              setUserData={setUserData}>
              </MovieSession>}>
          </Route>
          <Route 
            path="/assentos/:idSessao" 
            element={<MovieSeats 
              useData={userData}
              setUserData={setUserData}>
              </MovieSeats>}>
          </Route>
        </Routes>
      </AppMainContainer>
    </BrowserRouter>

  );
}

const AppMainContainer = styled.main`

`

export default App;
