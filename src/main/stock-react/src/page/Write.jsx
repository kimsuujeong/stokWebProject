import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import ReactQuill from "react-quill";


function Write() {

	useEffect(() => {
		const imageBtn = document.querySelector(".ql-image");

		if (imageBtn) {
			imageBtn.addEventListener("click", handleImageClick);
		}

		return () => {
			if (imageBtn) {
				imageBtn.removeEventListener("click", handleImageClick);
			}
		};

	}, []);

	const handleImageClick = () => {
	};


	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, false] }],
				[{ color: ["red", "pink", "blue", "yellow", "gray", "black"] }],
				["bold", "underline"],
				["image"],
			],
		},
	};

	return (
		<>
			<Form>

				<h1>
					글쓰기
				</h1>
				<Form.Select
					style={{ width: "100%" }}>
					<option>주식 코드</option>
				</Form.Select>
				<br></br>
				<Form.Control
					style={{ width: "100%" }}
					type="text" placeholder="제목" />
				<br></br>
				<ReactQuill
					style={{ margin: "5px", width: "auto", height: "500px" }}
					modules={modules}
					placeholder="사진 첨부파일을 올리면 챗GPT가 답변해줍니다"
				/>
			</Form>
		</>
	)
}

export default Write;