import React from "react";
import { Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Counter from "./layOut/Counter";
import Home from "./page/Home";
import Question from "./page/Question";
import ChatRoom from "./page/ChatRoom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Write from "./page/Write";

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
			</Routes>
		</div>
	);
	
}

export default App;
