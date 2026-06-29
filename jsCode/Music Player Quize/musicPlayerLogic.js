import { musicLibrary } from "./musicPlayerLibrary.js";
import { field } from "../renderPages.js";

// Состояние плеера
let isPlaying = false;

 // Смена иконки
export function iconChanger(icon) {

    if (isPlaying) {
        isPlaying = false;
        icon.classList.replace('fa-pause', 'fa-play');
    } else {
        isPlaying = true;
        icon.classList.replace('fa-play', 'fa-pause');
    };

};

export function playAudio(icon, id) {


    if (!musicLibrary[id] || !musicLibrary[id].src) {
        icon.classList.replace('fa-pause', 'fa-play');
        console.error('Не найден трек с id:', id);
        alert(`Не найден трек под номером ${id}. проверьте библиотеку в файле musicLibrary.js`);
        return;
    }

    const addAudio = `
        <audio src="${musicLibrary[id].src}" autoplay></audio>
    `;

    if (field.querySelector('audio')) {
        field.querySelector('audio').remove();
    } else {
        field.insertAdjacentHTML('afterbegin', addAudio);
    };

    const audio = field.querySelector('audio');
    const progressBar = field.querySelector('.progressBar');
    const progress = field.querySelector('.progress');
    const currentTimeEl = field.querySelector('.currentTime');
    const durationEl = field.querySelector('.duration');

    // Прогресс-бар
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percent + '%';
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });

     audio.addEventListener('loadedmetadata', () => {
        if (audio.duration) {
            durationEl.textContent = formatTime(audio.duration);
        }
    });

    audio.addEventListener('ended', () => {
        iconChanger(icon);
        field.querySelector('audio').remove();
    })

     // Перемотка
    progressBar.addEventListener('click', (e) => {
        if (!audio.duration) return;
        
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        audio.currentTime = clickPosition * audio.duration;
    });

};


 function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }


