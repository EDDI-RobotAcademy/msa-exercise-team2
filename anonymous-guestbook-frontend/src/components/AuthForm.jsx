import React, { useState } from "react";
import styled from "styled-components";
import {
    FaGoogle,
    FaGithub,
} from "react-icons/fa";
import { checkEmailDuplicate, signup, login } from "../api";

const AuthForm = () => {
    const [mode, setMode] = useState("signin");
    const [form, setForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });
    const [isEmailValid, setIsEmailValid] = useState(null); // null | true | false

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
        if (id === "email") {
            setIsEmailValid(null); // 이메일 변경 시 상태 초기화
        }
    };

    const handleReset = () => {
        setForm({ email: "", password: "", repeatPassword: "" });
        setIsEmailValid(null);
    };

    const handleCheckEmail = async () => {
        if (!form.email) {
            alert("이메일을 입력하세요.");
            return;
        }
        try {
            const res = await checkEmailDuplicate(form.email);
            if (res.data === true) {
                alert("사용 가능한 이메일입니다.");
                setIsEmailValid(true);
            } else {
                alert("이미 사용 중인 이메일입니다.");
                setIsEmailValid(false);
            }
        } catch (err) {
            alert("중복 확인 실패");
            setIsEmailValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === "signup") {
            if (!isEmailValid) {
                return alert("이메일 중복 확인이 필요합니다.");
            }
            if (form.password !== form.repeatPassword) {
                return alert("비밀번호가 일치하지 않습니다.");
            }

            try {
                await signup({
                    email: form.email,
                    password: form.password,
                });
                alert("회원가입 성공! 로그인 해보세요.");
                handleReset();
                setMode("signin");
            } catch (err) {
                alert("회원가입 실패");
            }

        } else {
            try {
                await login({
                    email: form.email,
                    password: form.password,
                });
                alert("로그인 성공!");
                // 이후 토큰 저장 등 처리 가능
            } catch (err) {
                alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
            }
        }
    };

    return (
        <Container>
            <Title>{mode === "signin" ? "SIGN IN" : "SIGN UP"}</Title>
            <Links>
                <LinkItem active={mode === "signin"} onClick={() => setMode("signin")}>SIGN IN</LinkItem>
                <LinkItem active={mode === "signup"} onClick={() => setMode("signup")}>SIGN UP</LinkItem>
                <LinkItem style={{ marginLeft: "auto" }} onClick={handleReset}>RESET</LinkItem>
            </Links>

            <Form onSubmit={handleSubmit}>
                <InputBlock>
                    <Input
                        type="email"
                        placeholder="Email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    {mode === "signup" && (
                        <CheckButton type="button" onClick={handleCheckEmail}>
                            중복 확인
                        </CheckButton>
                    )}
                </InputBlock>

                <InputBlock>
                    <Input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </InputBlock>

                {mode === "signup" && (
                    <InputBlock>
                        <Input
                            type="password"
                            placeholder="Repeat password"
                            id="repeatPassword"
                            value={form.repeatPassword}
                            onChange={handleChange}
                            required
                        />
                    </InputBlock>
                )}

                <SubmitButton type="submit">
                    {mode === "signin" ? "Sign in" : "Sign up"}
                </SubmitButton>
            </Form>

            <Separator><p>OR</p></Separator>

            <SocialButton><FaGoogle /> Sign in with Google</SocialButton>
            <SocialButton><FaGithub /> Sign in with GitHub</SocialButton>
        </Container>
    );
};

export default AuthForm;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Links = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  cursor: pointer;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const CheckButton = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #5a6268;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Separator = styled.div`
  text-align: center;
  margin: 1rem 0;
  p {
    font-weight: bold;
  }
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  background-color: #f2f2f2;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
