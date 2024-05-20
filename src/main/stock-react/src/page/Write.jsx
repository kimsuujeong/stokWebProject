import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import ReactQuill from "react-quill";
import S3Upload from "../components/S3Upload";
import SelectStock from "../components/SelectStock";



function Write() {

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

	return (
		<>
			<Form>
				<h3 style={{padding:"20px", color:"gray-dark"}}>
					<b>주식 질문방</b>
				</h3>

				<SelectStock/>
				<br></br>

				<S3Upload />
				<br></br>

				<Form.Control
					style={{ width: "100%" }}
					type="text" placeholder="제목" />
				<br></br>

				<ReactQuill
					style={{ margin: "5px", width: "auto", height: "500px" }}
					modules={modules}
				/>
			</Form>
		</>
	)
}

export default Write;