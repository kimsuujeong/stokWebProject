import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

import('./Comment.css');

const Comment = () => {

    const { boardNumber } = useParams();
    const [userId, setUserId] = useState('');
    const [comment, setComment] = useState('');
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        const userIdFromCookie = Cookies.get('sessionId');
        setUserId(userIdFromCookie);
    }, []);

    const handleCommentChange = (event) => {

        const inputText = event.target.value;

        if (inputText.length <= 50) {

            setComment(inputText);
            setCharCount(inputText.length);

        }

    };

    const handleSubmitComment = async () => {

        const requestData = {boardNumber, userId, comment};

		try {

			const response = await axios.post(`http://localhost:8085/detail/${boardNumber}/comments`, requestData);
			
            if (!comment) {

				alert('댓글을 확인해주세요.');

                return
            }


			if(response.status === 200) {

				alert("댓글 작성 되었습니다.");
                window.location.reload();

			} else {

				alert("댓글 작성에 실패했습니다.");

			}
		} catch (error) {

			console.error('댓글 달기 실패:', error);
			alert("댓글 작성에 실패했습니다.");
		}

    };

    return (
        <>

            <h5>전체 댓글</h5>
            <hr />

            {/* 댓글 입력란 */}
            <textarea
                className="CommentBox"
                value={comment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요 (최대 50글자)"
                maxLength={50}
                rows={4} // 여러 줄 입력을 위해 rows 속성 추가
                style={{ width: '100%', padding: '10px', resize: 'vertical' }} // 스타일 지정
            />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Button className="d-grid gap-2" variant="secondary" size="sm" onClick={handleSubmitComment}>댓글 작성</Button>
                <div style={{paddingLeft:"0.5rem"}}>{charCount}/50 글자 {/* 글자 수 카운팅 표시 */}</div>
            </div>

        </>
    );
};

export default Comment;
