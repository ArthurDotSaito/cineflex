import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import {BsArrowLeft}from 'react-icons/bs'

const Header = () => {
const navitage = useNavigate();
const location = useLocation();

    return(
        <HeaderTitleContainer>
            <button
                onClick={() =>{navitage(-1)}}>
            {location.pathname !== "/" && <BsArrowLeft/>}
            </button>
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
    position: relative;
    button{
        position: absolute;
        left: 15px;
        top: 10px;
        background-color: transparent;
        border: none;
        font-size: 40px;
        cursor: pointer;
    }
`

export default Header;