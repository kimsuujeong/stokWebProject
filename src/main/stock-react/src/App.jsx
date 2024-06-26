import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrimeReactProvider } from 'primereact/api';

import Counter from "./layOut/Counter";
import Home from "./page/Home";
import Question from "./page/Question";
import ChatRoom from "./page/ChatRoom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Write from "./page/Write";
import WriteUpdate from "./page/WriteUpdate";
import Detail from "./page/Detail";

function App() {

	return (

		<div className='App'>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/question" element={<Question />} />
				<Route path="/Write" element={<Write />} />
				<Route path="/Counter" element={<Counter />} />
				<Route path="/chatRoom" element={<ChatRoom />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/detail/:boardNumber" element={<Detail />} />
				<Route path="/WriteUpdate/:boardNumber" element={<WriteUpdate />} />
			</Routes>
		</div>
	);
	
}

export default App;
