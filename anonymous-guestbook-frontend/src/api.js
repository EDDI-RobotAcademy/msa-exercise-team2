import axios from 'axios';

// axios 인스턴스 생성 (공통 baseURL 설정)
const api = axios.create({
    baseURL: '/api/guestbook',
});
// account용 베이스 url
const aapi = axios.create({
    baseURL: '/api/account',
});

// 방명록 목록 가져오기
export const getGuestbookList = () => api.get('');  // 빈 문자열로 호출

// 글 작성
export const postGuestbook = (data) => api.post('', data);

// 글 삭제
export const deleteGuestbook = (id, password) => api.delete(`/${id}`, {
    data: { password },
});

// 글 수정
export const updateGuestbook = (id, data) => api.put(`/${id}`, data);


// 회원 가입 관련

// 회원 가입
export const signup = (data) => aapi.post('/signup', data);

// 로그인
export const login = (data) => aapi.post('/login', data);

// 이메일 중복 체크
export const checkEmailDuplicate = (email) => aapi.get('/check-email',{params:{email}});

export default api;