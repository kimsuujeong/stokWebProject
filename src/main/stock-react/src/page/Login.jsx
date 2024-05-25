import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToSign, setRedirectToSign] = useState(false);
    const navigate = useNavigate();

    const saveEmail = event => {
        setEmail(event.target.value);
    };

    const savePassword = event => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        const requestData = { email, password };

        axios.post('http://localhost:8085/login', requestData)
            .then(response => {
                console.log(response.data);
                document.cookie = `sessionId=${email}; path=/`;
                alert("로그인 되었습니다.");
                navigate('/');
            })
            .catch(error => {
                alert("로그인 실패했습니다.");
            });
    };

    const redirectToSignPage = () => {
        setRedirectToSign(true);
    };

    if (redirectToSign) {
        return <Navigate to="/signup" />;
    }

    return (
        <Container>
            <Row className="justify-content-md-center" style={{ marginTop: '50px' }}>
                <Col xs={8} md={4}>
                    <h2>로그인</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={saveEmail}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={savePassword}
                            />
                        </Form.Group>
                        <div style={{marginTop:"0.5rem"}}>
                        <Button variant="primary" onClick={handleLogin}>로그인</Button>{' '}
                        <Button variant="secondary" onClick={redirectToSignPage}>회원가입</Button>
                        </div>

                        
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
