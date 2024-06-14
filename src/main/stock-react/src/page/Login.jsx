import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../login.css'

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
        // 이메일과 비밀번호가 비어 있는지 확인
        if (!email){
            alert("이메일을 입력해주세요");
            return;
        }

        if(!password){
            alert('비밀번호를 입력해주세요');
            return;
        }

        if (!email || !password) {
            alert("이메일과 비밀번호를 모두 입력해주세요.");
            return;
        }

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
        <div className="LoginContainer">
        <Container >
            <Row>
                <Col xs={8} md={4}>
                    <h2>로그인</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={saveEmail}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={savePassword}
                            />
                        </Form.Group>
                        <div style={{width:"155%"}}>
                        <Button style={{margin:"0px 0px 0px 0px"}} id="loginBnt" variant="primary" onClick={handleLogin}>로그인</Button>{' '}
                        <Button id="signupBnt" variant="secondary" onClick={redirectToSignPage}>회원가입</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default Login;
