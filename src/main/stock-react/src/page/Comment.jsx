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
    const [editMode, setEditMode] = useState(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        const userIdFromCookie = Cookies.get('sessionId');
        setUserId(userIdFromCookie);
    }, []);

    useEffect(() => {
        fetchComments();
    }, [boardNumber]);

    // 댓글 불러오기
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/detail/${boardNumber}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('댓글 불러오기 실패:', error);
            alert("댓글 불러오기에 실패했습니다.");
        }
    };

    // 댓글 길이 제한
    const handleCommentChange = (event) => {
        const inputText = event.target.value;
        if (inputText.length <= 200) {
            setNewComment(inputText);
            setCharCount(inputText.length);
        }
    };

    // 댓글 작성
    const handleSubmitComment = async () => {
        if (!newComment) {
            alert('댓글을 확인해주세요.');
            return;
        }
        const requestData = { boardNumber, userId, comment: newComment };
        try {
            const response = await axios.post(`http://localhost:8085/detail/${boardNumber}/comments`, requestData);
            if (response.status === 200) {
                fetchComments();
                setNewComment('');
                setCharCount(0);
                alert("댓글 작성 되었습니다.");
            } else {
                alert("댓글 작성에 실패했습니다.");
            }
        } catch (error) {
            console.error('댓글 달기 실패:', error);
            alert("댓글 작성에 실패했습니다.");
        }
    };

    // 댓글 더보기
    const toggleExpand = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].expanded = !updatedComments[index].expanded;
        setComments(updatedComments);
    };

    // 댓글 수정
    const handleEditClick = (index, initialComment) => {
        setEditMode(index);
        setEditValue(initialComment);
    };

    const handleEditChange = (event) => {
        const editedText = event.target.value;
        setEditValue(editedText);
    };

    const handleUpdateComment = async (commentId) => {

        try {

            const requestData = { commentId, comment: editValue };
            const response = await axios.put(`http://localhost:8085/detail/comments/${commentId}`, requestData);

            if (response.status === 200) {

                fetchComments();
                setEditMode(null);
                setEditValue('');
                alert("댓글이 수정되었습니다.");
                
            } else {
                alert("댓글 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error('댓글 수정 실패:', error);
            alert("댓글 수정에 실패했습니다.");
        }
    };

    const handleDeleteComment = async (commentId) => {

        try {

            const response = await axios.delete(`http://localhost:8085/detail/comments/${commentId}`);
            
            if (response.status === 200) {

                fetchComments();
                alert("댓글이 삭제되었습니다.");

            } else {

                alert("댓글 삭제에 실패했습니다.");

            }
        } catch (error) {

            console.error('댓글 삭제 실패:', error);
            alert("댓글 삭제에 실패했습니다.");

        }
    };

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <>
            <h5>전체 댓글 ({comments.length})</h5>
            <hr />

            <textarea
                className="CommentBox"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요 (최대 200글자)"
                maxLength={200}
                rows={4}
                style={{ width: "100%", padding: "10px", resize: "vertical" }}
            />

            <div style={{ display: "flex", alignItems: "center", marginTop: "0.7rem", marginBottom: "0.7rem", justifyContent: "flex-end" }}>
                <Button className="d-grid gap-2" variant="secondary" size="sm" onClick={handleSubmitComment}>댓글 작성</Button>
                <div style={{ paddingLeft: "0.5rem" }}>{charCount}/200 글자</div>
            </div>

            {comments.map((comment, index) => (
                <div key={comment.commentId} style={{ marginBottom: '0.5rem', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', marginRight: '1rem', flexBasis: '20%' }}>{comment.userNickname}</div>

                    
                    <div style={{ flex: 1 }}>
                        {editMode === index ? (
                            <textarea
                                value={editValue}
                                onChange={handleEditChange}
                                rows={2}
                                style={{ width: "100%", padding: "5px", resize: "vertical" }}
                            />
                        ) : (
                            comment.comment.length > 20 ? (
                                <>
                                    {comment.expanded ? comment.comment : `${comment.comment.slice(0, 30)}...`}
                                    <Button variant="link" size="sm" onClick={() => toggleExpand(index)}>
                                        {comment.expanded ? '접기' : '더보기'}
                                    </Button>
                                </>
                            ) : (
                                comment.comment
                            )
                        )}
                    </div>

                    <p>{comment.commentTime === comment.commentUpdateTime ? <> {formatDateTime(comment.commentTime)} </> : <> 수정함: {formatDateTime(comment.commentTime)}</>} </p>

                    {userId === comment.email && (

                        <div style={{ marginLeft: '10px' }}>

                            {editMode === index ? (

                                <Button variant="outline-primary" size="sm" style={{ marginRight: '5px' }} onClick={() => handleUpdateComment(comment.commentId)}>완료</Button>
                            
                            ) : (

                                <Button variant="outline-primary" size="sm" style={{ marginRight: '5px' }} onClick={() => handleEditClick(index, comment.comment)}>수정</Button>
                            
                            )}

                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment.commentId)}>삭제</Button>
                        
                        </div>

                        

                    )}

                </div>

            ))}
            
        </>
    );
};

export default Comment;
