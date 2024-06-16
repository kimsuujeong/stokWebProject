import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

import('./Comment.css');

const Comment = () => {

    const { boardNumber } = useParams();
    const [userId, setUserId] = useState('');
    const [comments, setComments] = useState([]);
    const [charCount, setCharCount] = useState(0);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {

        const userIdFromCookie = Cookies.get('sessionId');
        setUserId(userIdFromCookie);

    }, []);

    useEffect(() => {

        fetchComments();

    }, [boardNumber]);

    const fetchComments = async () => {
        try {

            const response = await axios.get(`http://localhost:8085/detail/${boardNumber}/comments`);
            setComments(response.data);

        } catch (error) {

            console.error('댓글 불러오기 실패:', error);
            alert("댓글 불러오기에 실패했습니다.");
        }

    };

    const handleCommentChange = (event) => {
        const inputText = event.target.value;

        if (inputText.length <= 200) {

            setNewComment(inputText);
            setCharCount(inputText.length);

        }
    };

    const handleSubmitComment = async () => {
        if (!newComment) {

            alert('댓글을 확인해주세요.');
            return;

        }

        const requestData = { boardNumber, userId, comment: newComment };

        try {
            const response = await axios.post(`http://localhost:8085/detail/${boardNumber}/comments`, requestData);

            if (response.status === 200) {

                fetchComments(); // 바로 랜더링하기
                setNewComment(''); // comment 초기화
                setCharCount(0); // count 초기화
                alert("댓글 작성 되었습니다.");

            } else {

                alert("댓글 작성에 실패했습니다.");

            }
        } catch (error) {

            console.error('댓글 달기 실패:', error);
            alert("댓글 작성에 실패했습니다.");

        }
    };

    const toggleExpand = (index) => {

        const updatedComments = [...comments];
        updatedComments[index].expanded = !updatedComments[index].expanded;
        setComments(updatedComments);

    };

    return (
        <>
            <h5>전체 댓글 ({comments.length})</h5>
            <hr />

            {/* 댓글 입력란 */}

            <textarea
                className="CommentBox"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요 (최대 200글자)"
                maxLength={200}
                rows={4} // 여러 줄 입력을 위해 rows 속성 추가
                style={{ width: "100%", padding: "10px", resize: "vertical" }} // 스타일 지정
            />

            <div style={{ display: "flex", alignItems: "center", marginTop: "0.7rem", marginBottom: "0.7rem", justifyContent: "flex-end" }}>
                <Button className="d-grid gap-2" variant="secondary" size="sm" onClick={handleSubmitComment}>댓글 작성</Button>
                <div style={{ paddingLeft: "0.5rem" }}>{charCount}/200 글자</div>
            </div>

            {/* 댓글 목록 */}
            {comments.map((comment, index) => (

                <div key={comment.commentId} style={{ marginBottom: '0.5rem', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                   
                   <div style={{ fontWeight: 'bold', marginRight: '1rem', flexBasis: '20%' }}>{comment.userNickname}</div>
                    <div style={{ flex: 1 }}>
                        
                        {comment.comment.length > 20 ? (
                            <>
                                {comment.expanded ? comment.comment : `${comment.comment.slice(0, 30)}...`}
                                <Button variant="link" size="sm" onClick={() => toggleExpand(index)}>
                                    {comment.expanded ? '접기' : '더보기'}
                                </Button>
                            </>
                        ) : (
                            comment.comment
                        )}
                    </div>
                    
                </div>
            ))}
        </>
    );
};

export default Comment;
