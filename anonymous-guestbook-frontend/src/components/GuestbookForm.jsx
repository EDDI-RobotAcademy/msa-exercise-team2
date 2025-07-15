import React, { useState } from 'react';
import styled from 'styled-components';

function GuestbookForm({ onAdd }) {
    const [nickname, setNickname] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nickname || !content || !password) return alert("모두 입력해 주세요.");

        await onAdd({ nickname, content, password });
        setNickname('');
        setContent('');
        setPassword('');
    };


    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호 (삭제/수정 시 필요)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <SubmitButton type="submit">글 남기기</SubmitButton>
        </FormContainer>
    );
}

export default GuestbookForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border-bottom: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 0.4rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 0.4rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;
