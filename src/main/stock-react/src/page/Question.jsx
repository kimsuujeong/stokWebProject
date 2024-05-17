import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuestionComponent() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/question');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>게시글 목록</h1>
            <button>글쓰기 버튼</button>
            <ul>
                {questions.map(question => (
                    <li key={question.boardNumber}>
                        <p>글 번호: {question.boardNumber}</p>
                        <p>제목: {question.title}</p>
                        <p>작성자: {question.userId}</p>
                        <p>작성일: {question.createTime}</p>
                        <p>주식 코드: {question.stockCode}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionComponent;