import React from 'react';
import styled from 'styled-components';
import Logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 7rem;
`;

const LinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 20rem;
`;

const ImgContainer = styled.div`
    margin-left: 1rem;
    margin-right: 3rem;
`;

const A = styled.div`
    color: black;
    text-decoration: none;
    font-weight: bold;
`;

const Img = styled.img`
    width: 5rem;
`;

const HoverBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 6rem;
    border-radius: 1rem;
    &:hover {
        background-color: lightgray;
        color: white;
    }
`;


const Header = () => {
    return (
    <>
        <HeaderContainer>
            <ImgContainer>
                <Link to='/'><Img src={Logo}></Img></Link>
            </ImgContainer>
            <LinkContainer>
                <Link style={{ textDecoration: 'none' }} to='/'> <HoverBox> <A> Product </A> </HoverBox></Link>
                <Link style={{ textDecoration: 'none' }} to='/doc'> <HoverBox><A> Document </A></HoverBox> </Link>
                <Link style={{ textDecoration: 'none' }} to='/example'> <HoverBox><A> Example </A> </HoverBox></Link>
            </LinkContainer>
        </HeaderContainer>
    </>
    );
};

export { Header };