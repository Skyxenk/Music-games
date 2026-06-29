import {videoLibraryRoundOne, videoLibraryRoundTwo} from './videoLibrary.js';
import {musicLibrary} from './Music Player Quize/musicPlayerLibrary.js';


export const field = document.querySelector('.field');
export const titlePage = document.querySelector('title')
export const gameContainer = document.querySelector('.game-container');
export const btnRounds = document.querySelectorAll('.btnRound');
export let numberRound = 'one';
export const footer = `<div class="footer">
            <p>Created by Artem Trondin & fucking DeepSeek <i class="fas fa-heart" style="color: #ff416c;"></i></p>
        </div>`;


// Переключение темы

const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'lightTheme') {
    document.body.classList.add('lightTheme');
    if (themeToggle) themeToggle.checked = true;
} else {
    document.body.classList.remove('lightTheme');
    if (themeToggle) themeToggle.checked = false;
}

// Обработчик переключения
if (themeToggle) {
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('lightTheme');
            localStorage.setItem('theme', 'lightTheme');
        } else {
            document.body.classList.remove('lightTheme');
            localStorage.setItem('theme', 'darkTheme');
        }
    });
}


window.onload = function() {
    
    gameContainer.insertAdjacentHTML('beforeend', footer);

    if (titlePage.textContent === 'Музыкальное лото') {
        if (numberRound === 'one') {
            for (let i = 1; i< videoLibraryRoundOne.length; i++) {
                const renderButtons = `
                    <div class="btnBlock menu-section">
                        <button class="btn btnSong" id="${i}">${i}</button>
                    </div>
                `;
                field.insertAdjacentHTML('beforeend', renderButtons);
            };
        } else if (numberRound === 'two') {
            for (let i = 1; i< videoLibraryRoundTwo.length; i++) {
                const renderButtons = `
                    <div class="btnBlock menu-section">
                        <button class="btn btnSong" id="${i}">${i}</button>
                    </div>
                `;
                field.insertAdjacentHTML('beforeend', renderButtons);
            };
        }
    };

    if (titlePage.textContent === 'Квиз') {
        for (let i = 1; i< musicLibrary.length; i++) {
            const renderButtons = `
                <div class="btnBlock menu-section">
                    <button class="btn btnSong" id="${i}">${i}</button>
                </div>
            `;
            field.insertAdjacentHTML('beforeend', renderButtons);
        };
    };
};

btnRounds.forEach(button => {
    button.addEventListener('click', () =>{
        btnRounds.forEach(btn => {
            btn.classList.remove('active')
        });
        button.classList.add('active');
        numberRound = button.id;
    });

});