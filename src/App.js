import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import styled from 'styled-components'
import Header from "./components/Header";
import Movies from './components/Movies';
import MovieSession from './components/MovieSession';
import GlobalStyle from './styles/globalStyles';

function App() {
  return (
    <BrowserRouter>
      <AppMainContainer>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Movies></Movies>}></Route>
          <Route path="/sessoes/:idMovie" element={<MovieSession></MovieSession>}></Route>
        </Routes>
      </AppMainContainer>
    </BrowserRouter>

  );
}

const AppMainContainer = styled.main`

`

export default App;
