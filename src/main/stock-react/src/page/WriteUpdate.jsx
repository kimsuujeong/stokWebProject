import React, { useEffect, useState, Redirect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import ReactQuill from "react-quill";

const WriteUpdate = () => {
    const { boardNumber } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [userId, setUserId] = useState('');
    const [userIdFromCookie, setUserIdFromCookie] = useState('');
    const [isUserPost, setIsUserPost] = useState(false);

    // 상세 글 로드
    useEffect(() => {

        async function fetchPost() {
            try {

                const response = await axios.get(`/question/${boardNumber}`);
                setPost(response.data);
                setTitle(response.data.title);
                setContents(response.data.contents);
                setImage(response.data.imageURL);
                setResult(response.data.chatgpt);
                setUserId(response.data.email);
                setUserIdFromCookie(Cookies.get('sessionId'));

            } catch (error) {

                console.error('Error fetching post:', error);

            }
        }
        fetchPost();

    }, [boardNumber]);

    // 사용자 확인
    useEffect(() => {

        if (userId && userIdFromCookie) {
            setIsUserPost(userId == userIdFromCookie);
        }

    }, [userId, userIdFromCookie]);

    const handleUpdate = async () => {

        try {

            const updatedPost = { boardNumber, title, contents };
            const response = await axios.put(`http://localhost:8085/WriteUpdate/${boardNumber}`, updatedPost);
    
            if (response.status === 200) {

                alert("글 수정이 완료 되었습니다.");

                window.location.href = `/detail/${boardNumber}`;

            } else {

                alert("글 수정에 실패했습니다.");

            }
    
        } catch (error) {

            console.error('Error updating post:', error);
            alert('게시물 수정에 실패했습니다.');

        }

    };
    

    const handleDelete = async () => {

        try {
            await axios.delete(`/question/${boardNumber}`);
            alert('게시물이 삭제되었습니다.');
            // 삭제 후에는 목록 페이지로 이동
            window.location.href = '/question';
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('게시물 삭제에 실패했습니다.');
        }

    };

    // 파일 로딩
    if (!post) {
        return <div>Loading...</div>;
    }

    // fileReader
    const reader = new FileReader();

    reader.onload = () => {

        setImage(reader.result);

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

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (

        <>

            <Container style={{padding:"3rem"}}>

                {isUserPost ? (<>
                {userIdFromCookie && <div style={{ textAlign: "right", marginBottom: "10px", marginTop: "20px" }}>
                    <Button style={{ margin: "0.2rem" }} onClick={handleUpdate}>완료</Button>
                    <Button style={{ margin: "0.2rem" }} onClick={handleDelete}>삭제</Button>
                </div>}
                </>) : <></>}
                
                <Form.Control
                        style={{ width: "100%" , fontSize: "1.5rem"}}
                        type="text" placeholder="제목"
                        value={title}
                        onChange={handleTitleChange}
                    />
                <p> {post.nickname} | {post.stockName}({post.stockCode}) |
                    {post.createTime == post.updateTime ? <> {formatDateTime(post.createTime)} </> : <> {formatDateTime(post.createTime)} | 수정: {formatDateTime(post.updateTime)}</>} </p>
                <hr></hr>

                {/* fileReader */}
                {image && <img src={image} alt="미리보기" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '500px' }} />}

                {/* <div style={{marginTop:"2rem"}} dangerouslySetInnerHTML={{ __html: contents }}></div> */}

                <ReactQuill
                        style={{ paddingTop:"1rem", paddingBottom:"2rem", margin: "0px", width: "auto", height: "500px" }}
                        modules={modules}
                        value={contents}
                        onChange={handleContentsChange}
                    />

                {image && <Card style={{marginTop:"2rem"}} >
                    <Card.Header>[Gemini] AI답변 입니다.
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <footer className="blockquote-footer">
                                <cite title="Source Title">{result && <div>{result}</div>}</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>}

            </Container>

        </>
    );
};

export default WriteUpdate;