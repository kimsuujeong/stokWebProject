import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import ReactQuill from "react-quill";
import S3Upload from "../components/S3Upload";
import SelectStock from "../components/SelectStock";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Write() {
    const [userid, setUserid] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [stockCode, setStockCode] = useState('');
    const [imageURL, setImageURL] = useState('');
    const questionNavigate = useNavigate();

    useEffect(() => {
        const userIdFromCookie = Cookies.get('sessionId');
        setUserid(userIdFromCookie);
    }, []);

    const handleWrite = async () => {
        const requestData = { userid, title, contents, stockCode, imageURL };

		try {
			const response = await axios.post('http://localhost:8085/write', requestData);
			console.log(response.data);
			if(response.status === 200) {
				alert("글 작성이 완료 되었습니다.");
				questionNavigate("/question");
			} else {
				alert("글 작성에 실패했습니다.");
			}
		} catch (error) {
			console.error('글쓰기 실패:', error);
			alert("글 작성에 실패했습니다.");
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
    };

    const handleContentsChange = (value) => {
        setContents(value);
    };

    const handleImageUrlChange = (url) => {
        setImageURL(url); // 이미지 URL 업데이트
    };

    return (
        <>
            <Form >
                <h3 style={{ margin: "10px", width: "10rem", color: "gray-dark" }}>
                    <b>주식 질문방</b>
                </h3>
				<Button type="button" 
				onClick={handleWrite}
				style={{margin:"1rem"}}>글 쓰기</Button>
				<br></br>
                <div style={{ margin: "1rem", color: "gray-dark" }}>
                    
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
