import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { generateContentFromFiles } from '../components/GeminiAPI';
import './Home.css';

const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file.type.startsWith('image')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setLoading(true); // 로딩 시작

        try {
            const text = await generateContentFromFiles(acceptedFiles);
            setResult(text);
        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <Container className="dropzone-container">
            <Row>
                <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>사진 파일을 업로드 하면 AI가 분석해 줍니다.</p>
                </div>
                {selectedFile && (
                    <>
                        <img src={imagePreview} alt="미리보기" className="image-preview" />
                        {imagePreview && (
                            <Card>
                                <Card.Header>[Gemini] AI 답변입니다.</Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <footer className="blockquote-footer">
                                            {loading && <div className="loading-spinner" />} {/* 로딩 스피너 */}
                                            {!loading && result && <cite title="Source Title">{result}</cite>} {/* 결과 출력 */}
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                        )}
                    </>
                )}
            </Row>
        </Container>
    );
};

export default Home;
