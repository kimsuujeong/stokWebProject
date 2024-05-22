// Write.js
import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import ReactQuill from "react-quill";
import S3Upload from "../components/S3Upload";
import SelectStock from "../components/SelectStock";
import axios from "axios";
import Cookies from 'js-cookie';

function Write() {
	const [userid, setUserid] = useState('');
	const [title, setTitle] = useState('');
	const [contents, setContents] = useState('');
	const [stockCode, setStockCode] = useState('');
	const [imageURL, setImageURL] = useState('');

	useEffect(() => {
		const userIdFromCookie = Cookies.get('sessionId');
		setUserid(userIdFromCookie);
	}, []);

	const handleWrite = async () => {
		const requestData = { userid, title, contents, stockCode, imageURL };

		try {
			console.log("id임" + userid)
			console.log("stockCode임" + stockCode)

			const response = await axios.post('http://localhost:8085/write', requestData);
			console.log(response.data);
			console.log("글보냄");
		} catch (error) {
			console.error('글쓰기 실패:', error);
		}

	};

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, false] }],
				[{ color: ["red", "pink", "blue", "yellow", "gray", "black"] }],
				["bold", "underline"],
				// ["image"],
			],
		},
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
		console.log(title)
	};

	const handleContentsChange = (value) => {
		setContents(value);
		console.log(contents)
	};

	const handleImageUrlChange = (url) => {
		setImageURL(url); // 이미지 URL 업데이트
		console.log("이미지 URL:", url);
	  };
	

	return (
		<>
			<Form >

				<h3 style={{ margin: "10px", width: "10rem", color: "gray-dark" }}>
					<b>주식 질문방</b>
				</h3>



				<div style={{ margin: "10px", color: "gray-dark" }}>
					
					<button onClick={handleWrite}>글 쓰기</button>

					<SelectStock onSelectChange={setStockCode} />
					<br></br>

					<S3Upload onImageUrlChange={handleImageUrlChange} />
					<br></br>

					<Form.Control
						style={{ width: "100%" }}
						type="text" placeholder="제목"
						value={title}
						onChange={handleTitleChange}
					/>

					<br></br>

					<ReactQuill
						style={{ margin: "5px", width: "auto", height: "500px" }}
						modules={modules}
						value={contents}
						onChange={handleContentsChange}
					/>

				</div>


			</Form>
		</>
	)
}

export default Write;
