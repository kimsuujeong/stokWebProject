import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { RiStockFill } from "react-icons/ri";

function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const navigate = useNavigate();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        const sessionId = getCookie('sessionId');
        if (sessionId !== undefined) {
            setIsLoggedIn(true);
        }
    }, [getCookie('sessionId')]); // getCookie('sessionId')가 변경될 때마다 useEffect 실행

    const handleLogout = () => {
        document.cookie = 'sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload(); 
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    <h4><RiStockFill /></h4>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">홈</Nav.Link>
                        <Nav.Link href="/question">주식 질문방</Nav.Link>
                        <Nav.Link href="/chatRoom">주식 주주 모임방</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {isLoggedIn ? (
                            <>
                            {/* <a style={{color:"white", padding:"8px"}}>닉네임 넣는 곳 인데 나중에 만들거임</a> */}
                            <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/login">로그인</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
