import {field} from './renderPages.js';
import {playerMenu} from './Music Player Quize/addPlayer.js'
import { iconChanger, playAudio } from './Music Player Quize/musicPlayerLogic.js';
import { musicLibrary } from "./Music Player Quize/musicPlayerLibrary.js";

const playerList = document.querySelector('.player-list');
const btnAddPlayer = document.querySelector('.btnAddPlayer');
const playerListInput = document.querySelector('.name-input');
const sidebar = document.querySelector('.sidebar');

// Обработка клика по кнопкам
field.onclick = (event) => {
    
    if (event.target.classList.contains('btn')) {
        const allBtnBlocks = field.querySelectorAll('.btnBlock');

        if (event.target.closest('.btnBlock').querySelector('.player-container')) {
            event.target.closest('.btnBlock').querySelector('.player-container').remove();

            if (field.querySelector('audio')) {
                field.querySelector('audio').remove();
                iconChanger(event.target.querySelector('.playIcon'));
            };

        } else {
            allBtnBlocks.forEach(block => {
                const playerContainer = block.querySelector('.player-container');
                if (playerContainer) {
                    playerContainer.remove();
                }
            });

            if (field.querySelector('audio')) {
                field.querySelector('audio').remove();
                iconChanger(event.target.querySelector('.playIcon'));
            };

            event.target.closest('.btnBlock').insertAdjacentHTML('beforeend', playerMenu)
            
        };
        

        return
       
    };

    // Получает id кликнутой кнопки
    const currentBtnBlock = event.target.closest('.menu-section');  
    const songId = currentBtnBlock.querySelector('.btnSong').id;

    //обработчик кнопки "play/pause"
    const playPauseBtn = event.target.closest('.play-pause');

    if (playPauseBtn) {

        const playIcon = playPauseBtn.querySelector('.playIcon');

        
        iconChanger(playIcon);
        playAudio(playIcon, songId);
        
        return
    };
   
    //обработчик кнопки "показать название"
    if (event.target.classList.contains('checkNameSong')) {
        const playerControls2 = event.target.closest('.player-controls2');

        toggleSongInfo(playerControls2, event.target, songId);  
        return
    };

    // Переменные для проверки названия трека
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const songAlbum = document.getElementById('songAlbum');

};


function toggleSongInfo(btnClick, btnCheckCloseName, id) {
    const allBtnclicks = btnClick.querySelectorAll('.song-info');
    if (allBtnclicks.length > 0) { 
        allBtnclicks.forEach(element => {
            element.remove();
        });

        btnCheckCloseName.textContent = 'Показать название';
    } else {
        const checkName = `<div class="song-info">
    <h2 class="nameTrack">Название трека</h2>
    <h1 class="song-title" id="songTitle">${musicLibrary[id].title}</h1>
    <p class="song-artist" id="songArtist">${musicLibrary[id].artist}</p>
    <p class="song-album" id="songAlbum">${musicLibrary[id].artist} • ${musicLibrary[id].year}</p>
    </div>`;
        btnClick.insertAdjacentHTML('afterbegin', checkName);
        btnCheckCloseName.textContent = 'Скрыть название';
    };
};


btnAddPlayer.onclick = () => {

    const name = playerListInput.value;

    const check = `<div class="check">Счет</div>`;

    const nameString = `<li class="pointer">${name}
            <button class="pointPlusMinus">
                <i class="fas fa-plus"></i>
            </button>
            <span>0</span> 
            <button class="pointPlusMinus">
                <i class="fas fa-minus"></i>
            </button>
    </li>`;

    if (!playerListInput.value) {
        return
    } else {
    playerList.insertAdjacentHTML('beforeend', nameString);

    if (!sidebar.querySelector('.check')) {
        playerList.insertAdjacentHTML('beforebegin', check);
    }

    playerListInput.value = '';
    };

};


playerList.onclick = (event) => {
    if (event.target.closest('.pointPlusMinus')) {

        const buttonPointer = event.target.closest('.pointPlusMinus')
        const listItem = buttonPointer.closest('.pointer');
        const counterSpan = listItem.querySelector('span');
        let point = parseInt(event.target.closest('.pointer').querySelector('span').textContent);
        
        if (buttonPointer.querySelector('.fa-plus')) {
            counterSpan.textContent = point + 1;
        };

        if (buttonPointer.querySelector('.fa-minus')) {
            if (counterSpan.textContent < 1) {
                buttonPointer.closest('.pointer').remove();
            } else {
            counterSpan.textContent = point - 1;
            };
        };

    };
};