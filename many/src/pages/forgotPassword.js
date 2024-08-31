import React, { useState } from 'react'; 
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import salyImage from '../assets/Saly-14.png';


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const auth = getAuth();

    const handlePasswordReset = () => {
        if (!email) {
            alert('이메일 주소를 입력하세요.');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('비밀번호 재설정 이메일이 전송되었습니다.');
            })
            .catch((error) => {
                console.error('비밀번호 재설정 중 오류가 발생했습니다:', error);
                alert('오류가 발생했습니다. 이메일 주소를 다시 확인하세요.');
            });
    };

    return (
        <div
            style={{ width: 1440, height: 900, position: "relative", overflow: "hidden", background: "#fff" }}
        >
            <div style={{ width: 629, height: 664 }}>
                <div style={{ width: 308, height: 152 }}>
                    <div style={{ width: 288, height: 75 }}>
                        <p
                            style={{
                                position: "absolute",
                                left: 175,
                                top: 294,
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: "left",
                                color: "#000",
                            }}
                        >
                            비밀번호 찾기
                        </p>
                    </div>
                    <div style={{ width: 308, height: 48 }}>
                        <p
                            style={{
                                width: 308,
                                position: "absolute",
                                left: 175,
                                top: 398,
                                fontSize: 16,
                                textAlign: "left",
                                color: "#000",
                            }}
                        >
                            <span style={{ width: 308, fontSize: 16, textAlign: "left", color: "#000" }}>
                                이메일 주소를 입력하면{" "}
                            </span>
                            <br />
                            <span style={{ width: 308, fontSize: 16, textAlign: "left", color: "#000" }}>
                                비밀번호 초기화가 발송됩니다
                            </span>
                        </p>
                    </div>
                </div>
                <div style={{ width: 313, height: 556, position: "absolute", left: 491, top: 402 }}>
                    <img
                        src={salyImage}
                        style={{
                            width: 313,
                            height: 556,
                            position: "absolute",
                            left: "-1px",
                            top: "-1px",
                            objectFit: "cover",
                        }}
                        alt="Saly Image"
                    />
                </div>
            </div>
            <div style={{ width: 369, height: 304 }}>
                <div style={{ width: 369, height: 62, position: "absolute", left: 892, top: 247 }} />
                <div style={{ width: 369, height: 59, position: "absolute", left: 892, top: 492 }}>
                    <div style={{ width: 369, height: 59 }}>
                        <div
                            style={{
                                width: 369,
                                height: 59,
                                position: "absolute",
                                left: "-0.5px",
                                top: "-0.5px",
                                borderRadius: 9,
                                background: "#4d47c3",
                                cursor: 'pointer',
                                boxShadow: "0px 4px 61px 0 rgba(77,71,195,0.4)",
                            }}
                            onClick={handlePasswordReset}
                        />
                        <p
                            style={{
                                position: "absolute",
                                left: 131,
                                top: 18,
                                fontSize: 16,
                                fontWeight: 500,
                                textAlign: "left",
                                color: "#fff",
                                cursor: 'pointer',
                            }}
                        >
                            비밀번호 초기화
                        </p>
                    </div>
                </div>
                <p
                    style={{
                        position: "absolute",
                        left: 892,
                        top: 324,
                        fontSize: 30,
                        fontWeight: 500,
                        textAlign: "left",
                        color: "#000",
                    }}
                >
                    비밀번호 찾기
                </p>
            </div>
            <div style={{ width: 369, height: 62 }}>
                <div style={{ width: 369, height: 62 }}>
                    <div
                        style={{
                            width: 369,
                            height: 62,
                            position: "absolute",
                            left: "891.5px",
                            top: "401.5px",
                            borderRadius: 8,
                            background: "#f0efff",
                        }}
                    />
                    <input
                        type="email"
                        placeholder="이메일 주소를 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            position: "absolute",
                            left: 918,
                            top: 422,
                            fontSize: 15,
                            textAlign: "left",
                            color: "#a7a3ff",
                        }}
                    >
                    </input>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;