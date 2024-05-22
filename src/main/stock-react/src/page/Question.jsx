import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

function QuestionComponent() {
    const [questions, setQuestions] = useState([]);
    const [redirectToWrite, setRedirectToWrite] = useState(false);
    const [sortedColumn, setSortedColumn] = useState('createTime');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

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

    const redirectToWritePage = () => {
        setRedirectToWrite(true);
    }

    if (redirectToWrite) {
        return <Navigate to="/Write" />;
    }

    // 페이징 처리
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

    // 정렬된 아이템
    const sortedItems = currentItems.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
        } else {
            return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
        }
    });

    // 페이징 버튼 처리
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(questions.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <Button 
        variant="outline-primary"
        key={number} onClick={() => setCurrentPage(number)}
        style={{marginLeft:"0.5rem"}}>
            {number}
        </Button>
    ));

    return (
        <Container>
            <h3 style={{ margin: "1rem", color: "gray-dark" }}>
                <b>게시글 목록</b>
            </h3>
            <Button onClick={redirectToWritePage} style={{ marginBottom: "1rem" }}>글쓰기 버튼</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>ID</th>
                        <th>만든 시간</th>
                        <th>주식 코드</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map(question => (
                        <tr key={question.boardNumber}>
                            <td>{question.boardNumber}</td>
                            <td>{question.title}</td>
                            <td>{question.userId}</td>
                            <td>{question.createTime}</td>
                            <td>{question.stockCode}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button 
                variant="secondary"
                onClick={() => 
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>최신 순 조회
                </Button>
            </div>

            <div style={{ marginTop: "1rem", textAlign: "center"}}>
                {renderPageNumbers}
            </div>
        </Container>
    );
}

export default QuestionComponent;
