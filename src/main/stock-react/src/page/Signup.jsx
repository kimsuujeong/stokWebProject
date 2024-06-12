import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [emailToken, setEmailToken] = useState('');
	const [emailTokenError, setEmailTokenError] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [nickname, setNickname] = useState('');
	const [nicknameError, setNicknameError] = useState('');
	const loginNavigate = useNavigate();

	const handlennickNameChange = async (e) => {

		const value = e.target.value;
		setNickname(value);
		const nicknamePattern = /^[^\s]{1,12}$/;

        if (!nicknamePattern.test(value)) {
            setNicknameError('공백 없이 12글자 이내로 해주세요.');
            return;
        }
        setNicknameError('');


		try {
			const response = await axios.post('http://localhost:8085/signup/nickNameCheck', { nickname : value });

			if (response.status === 200) {

				setNicknameError('이미 사용 중인 닉네임 입니다.');

			} else {

				setNicknameError('');

			}

		} catch (error) {

			console.error('닉네임 중복 확인 실패:', error);

		}

	};

	const handleEmailChange = async (e) => {

		const value = e.target.value;
		setEmail(value);
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!emailPattern.test(value)) {
			setEmailError('올바른 이메일 형식이 아닙니다.');
			return;
		}
		setEmailError('');

		try {
			const response = await axios.post('http://localhost:8085/signup/emailCheck', { email: value });

			if (response.status === 200) {

				setEmailError('이미 사용 중인 이메일입니다.');

			} else {

				setEmailError('');

			}

		} catch (error) {

			console.error('이메일 중복 확인 실패:', error);

		}

	};

	const handleEmailTokenSend = async () => {

		try {

			const response = await axios.post('http://localhost:8085/signup/email', { email });
	
			if (response.status === 200) {

				alert("이메일 토큰을 전송했습니다.");

			}

		} catch (error) {

			if (error.response && error.response.status === 401) {

				console.error('이미 사용 중인 이메일입니다.');
				alert('이미 사용 중인 이메일입니다.');

			} else {

				console.error('이메일 토큰 전송 실패:', error);
				alert("이메일 토큰 전송에 실패했습니다.");

			}

		}

	};
	
	

	const handleSignup = async (e) => {

		e.preventDefault();

		if (password !== checkPassword) {
			setPasswordError('비밀번호가 일치하지 않습니다.');
			return;
		}

		setPasswordError('');

		const requestData = { nickname, email, password, emailToken};

		try {

			const response = await axios.post('http://localhost:8085/signup', requestData);
			console.log(response.data);
			if (response.status === 200) {

				alert("회원가입이 완료 되었습니다.");

				loginNavigate("/login");

			} else {
				
				alert("회원가입에 실패했습니다.");

			}

		} catch (error) {

			if (error.response && error.response.status === 101) {

				console.error('이미 사용 중인 닉네임 입니다.');
				alert('이미 사용 중인 닉네임 입니다.');

			}

			if (error.response && error.response.status === 102) {

				console.error('이미 사용 중인 이메일 입니다.');
				alert('이미 사용 중인 이메일 입니다.');

			}

			if (error.response && error.response.status === 103) {

				console.error('토큰번호를 확인해주세요.');
				alert('토큰번호를 확인해주세요.');

			}

			console.error('회원가입 실패:', error);
			alert("회원가입에 실패했습니다.");

		}
	};

	return (
		<div className="container border rounded p-4 text-center" style={{ maxWidth: "500px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
			<h3 className="font-weight-bold mb-4">회원가입</h3>
			<form onSubmit={handleSignup}>

				<div className="form-group mb-3">
					<input type="text" className="form-control form-control-lg" placeholder="닉네임" value={nickname}  onChange={handlennickNameChange} />
					{nicknameError && <span className="text-danger">{nicknameError}</span>}
				</div>

				<div className="form-group mb-3">
					<div className="input-group">
						<input type="email" className="form-control form-control-lg" placeholder="이메일" value={email} onChange={handleEmailChange} />
						<div className="input-group-append">
							<button className="btn btn-outline-secondary btn-lg" type="button" onClick={handleEmailTokenSend}>인증하기</button>
						</div>
					</div>
					{emailError && <span className="text-danger">{emailError}</span>}
				</div>

				<div className="form-group mb-3">
					<input type="text" className="form-control form-control-lg" placeholder="이메일 토큰" value={emailToken} onChange={(e) => setEmailToken(e.target.value)} />
					{emailTokenError && <span className="text-danger">{emailTokenError}</span>}
				</div>

				<div className="form-group mb-3">
					<input type="password" className="form-control form-control-lg" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>

				<div className="form-group mb-3">
					<input type="password" className="form-control form-control-lg" placeholder="비밀번호 확인" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} />
					{passwordError && <span className="text-danger">{passwordError}</span>}
				</div>

				<button type="submit" className="btn btn-primary btn-lg">가입하기</button>
			</form>
		</div>
	);
};

export default Signup;
