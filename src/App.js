import styled from 'styled-components'
import Header from "./components/Header";
import Movies from './components/Movies';
import GlobalStyle from './styles/globalStyles';

function App() {
  return (
    <AppMainContainer>
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      <Movies></Movies>
    </AppMainContainer>
  );
}

const AppMainContainer = styled.main`

`

export default App;
