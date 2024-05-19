import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToSign, setRedirectToSign] = useState(false);

    const saveEmail = event => {
        setEmail(event.target.value);
    }

    const savePassword = event => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        const requestData = { email, password };

        axios.post('http://localhost:8085/login', requestData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('로그인 실패:', error);
            });
    }

    const redirectToSignPage = () => {
        setRedirectToSign(true);
    }

    if (redirectToSign) {
        return <Navigate to="/signup" />;
    }

    return (
        <div>
            일단 여기 로그인
            <br></br>
            <input
                className="login_id"
                type="text"
                placeholder="전화번호, 사용자 이름 또는 이메일"
                value={email}
                onChange={saveEmail}
            />
            <br></br>
            <input
                className="login_pw"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={savePassword}
            />
            <button onClick={handleLogin}>로그인</button>
            <button onClick={redirectToSignPage}>회원가입</button>
        </div>
    );
}

export default Login;