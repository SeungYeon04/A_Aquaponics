import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('auth-button'); // 로그인/로그아웃 버튼
    const loginForm = document.getElementById('login-form'); // 로그인 폼

    // 로그인 상태 확인 및 버튼 초기화
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (authButton) {
        if (loggedInUser) {
            // 로그인 상태: 로그아웃 버튼 설정
            authButton.textContent = '로그아웃';
            authButton.onclick = () => {
                localStorage.removeItem('loggedInUser');
                alert('로그아웃되었습니다.');
                window.location.reload(); // 새로고침으로 버튼 초기화
            };
        } else {
            // 로그아웃 상태: 로그인 버튼 설정
            authButton.textContent = '로그인';
            authButton.onclick = () => {
                window.location.href = 'login.html';
            };
        }
    }

    // 로그인 폼 제출 이벤트 처리
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const usersRef = collection(db, 'users');
                const userQuery = query(usersRef, where('email', '==', email), where('password', '==', password));
                const userSnapshot = await getDocs(userQuery);

                if (!userSnapshot.empty) {
                    alert('로그인에 성공했습니다.');
                    const user = userSnapshot.docs[0].data();
                    localStorage.setItem('loggedInUser', JSON.stringify(user));

                    // 버튼 업데이트
                    if (authButton) {
                        authButton.textContent = '로그아웃';
                        authButton.onclick = () => {
                            localStorage.removeItem('loggedInUser');
                            alert('로그아웃되었습니다.');
                            window.location.reload();
                        };
                    }

                    // 메인 페이지로 이동
                    window.location.href = 'index.html';
                } else {
                    alert('이메일 또는 비밀번호가 잘못되었습니다.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('로그인 중 오류가 발생했습니다.');
            }
        });
    }
});
