import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Cookies from 'js-cookie';
import Comment from './Comment';

function Detail() {
    const { boardNumber } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [userId, setUserId] = useState('');
    const [userIdFromCookie, setUserIdFromCookie] = useState('');
    const [isUserPost, setIsUserPost] = useState(false);
    const [redirectToUpdate, setRedirectToUpdate] = useState(false);
    const navigate = useNavigate();

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

            const updatedPost = { ...post, title, contents };
            await axios.put(`/question/${boardNumber}`, updatedPost);
            // 수정 후에는 다시 해당 게시물을 가져와서 업데이트
            const response = await axios.get(`/question/${boardNumber}`);
            setPost(response.data);
            alert('게시물이 수정되었습니다.');

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

    const redirectToUpdatePage = () => {
        setRedirectToUpdate(true);
    };

    if (redirectToUpdate) {
        return <Navigate to="/WriteUpdate" />;
    }

    return (

        <>

            <Container style={{ padding: "3rem" }}>

                {isUserPost ? (
                    <>
                        {userIdFromCookie && (
                            <div style={{ textAlign: "right", marginBottom: "10px", marginTop: "20px" }}>
                                <Link to={`/WriteUpdate/${post.boardNumber}`} style={{ textDecoration: 'none' }}>
                                    <Button style={{ margin: "0.2rem" }}>수정</Button>
                                </Link>
                                <Button style={{ margin: "0.2rem" }} onClick={handleDelete}>삭제</Button>
                            </div>
                        )}
                    </>
                ) : null}


                <h3>{post.title}</h3>
                <p> {post.nickname} | {post.stockName}({post.stockCode}) |
                    {post.createTime == post.updateTime ? <> {post.createTime} </> : <> {post.createTime} | 수정: {post.updateTime}</>} </p>
                <hr></hr>

                {/* fileReader */}
                {image && <img src={image} alt="미리보기" style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '500px' }} />}

                <div style={{ marginTop: "2rem" }} dangerouslySetInnerHTML={{ __html: contents }}></div>

                {image && <Card style={{ marginTop: "2rem" }} >
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
                <br></br>
                <Comment />
            </Container>

        </>
    );
}

export default Detail;