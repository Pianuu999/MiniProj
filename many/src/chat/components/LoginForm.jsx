import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [username, setUsername] = useState(''); // 초기값을 빈 문자열로 설정
    const [password, setPassword] = useState(''); // 초기값을 빈 문자열로 설정
    const [error, setError] = useState(''); // 초기값을 빈 문자열로 설정

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {
            'project-ID': "e575d3b7-00c0-432d-82be-c81db99b6d6d",
            'User-Name': username,
            'User-Secret': password
        };

        try {
            // 비동기 요청 처리
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            // 로그인 성공 시
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload(); // 페이지 새로 고침

        } catch (error) {
            // 로그인 실패 시 에러 메시지 설정
            setError('존재하지 않는 아이디나 비밀번호입니다');
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">채팅 앱</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // 올바른 onChange 사용
                        className="input"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 올바른 onChange 사용
                        className="input"
                        placeholder="Password"
                        required
                    />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>채팅을 시작하세요</span>
                        </button>
                    </div>
                    {error && <h2 className="error">{error}</h2>} {/* 에러 메시지 표시 */}
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
