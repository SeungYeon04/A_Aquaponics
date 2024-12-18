import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const diaryForm = document.getElementById('diary-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    if (diaryForm) {
        diaryForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const title = titleInput.value;
            const content = contentInput.value;

            try {
                const diaryRef = collection(db, 'diaries');
                await addDoc(diaryRef, { username: loggedInUser.username, title, content, date: new Date() });
                alert('글이 성공적으로 저장되었습니다.');
                window.location.href = 'gesifan.html';
            } catch (error) {
                console.error('Error saving diary:', error);
                alert('글 저장 중 오류가 발생했습니다.');
            }
        });
    }

    loadDiaries(loggedInUser.username);
});

async function loadDiaries() {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;

    try {
        const diariesRef = collection(db, 'diaries');
        const querySnapshot = await getDocs(diariesRef); // 조건 없는 getDocs 사용

        entriesList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const entry = doc.data();
            const entryElement = document.createElement('li');
            entryElement.innerHTML = `
                <h3>${entry.title}</h3>
                <p>작성자: ${entry.username} / ${new Date(entry.date.seconds * 1000).toLocaleString()}</p>
                <button class="view-btn" data-id="${doc.id}">상세보기</button>
            `;
            entryElement.querySelector('.view-btn').addEventListener('click', () => {
                localStorage.setItem('currentEntryId', doc.id);
                window.location.href = 'view.html';
            });
            entriesList.appendChild(entryElement);
        });
    } catch (error) {
        console.error('Error loading diaries:', error);
        alert('일기 불러오기 중 오류가 발생했습니다.');
    }
}
