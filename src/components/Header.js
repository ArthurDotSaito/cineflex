import styled from 'styled-components'

const Header = () => {

    return(
        <HeaderTitleContainer>
            CINEFLEX
        </HeaderTitleContainer>
    )
}

const HeaderTitleContainer = styled.main`
    width: 100%;
    min-height: 67px;
    display: flex;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 34px;
    line-height:40px;
    background-color: #C3CFD9;
    color: #E8833A;
    align-items: center;
    justify-content: center;
`

export default Header;