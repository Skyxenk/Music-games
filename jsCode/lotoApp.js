import {field} from './renderPages.js';
import {numberRound} from './renderPages.js';
import {videoLibraryRoundOne, videoLibraryRoundTwo} from './videoLibrary.js';


field.onclick = (event) => {
    if (event.target.classList.contains('btn')) {
        const allBtnBlocks = field.querySelectorAll('.btnBlock');
        
        if (event.target.closest('.btnBlock').querySelector('.video-content-wrapper')) {
            event.target.closest('.btnBlock').querySelector('.video-content-wrapper').remove();
        } else {
               allBtnBlocks.forEach(block => {
                const sectionTitle = block.querySelector('.section-title-video');
                if (sectionTitle) {
                    sectionTitle.remove();
                    };
                });

                allBtnBlocks.forEach(block => {
                const gameOptions = block.querySelector('.game-options-video');
                if (gameOptions) {
                    gameOptions.remove();
                    };
                });

                runSong(event.target);
        };

    };
};


function runSong(btn) {
    let btnId = btn.id; 
    
    const videoLibrary = numberRound === 'one' ? videoLibraryRoundOne : videoLibraryRoundTwo;

    const videoBlock =`
        <div class="video-content-wrapper">
            <div class="game-options-video">
                <video src="${videoLibrary[btn.id].src}" controls></video>
            </div>
        </div>
    `;

    const oldTitle = btn.closest('.btnBlock').querySelector('.section-title-video');
    if (oldTitle) oldTitle.remove();

    const nameVideo = `<h2 class="section-title-video">
            ${videoLibrary[btn.id].title} — ${videoLibrary[btn.id].artist}
        </h2>`;

    btn.closest('.btnBlock').insertAdjacentHTML('beforeend', videoBlock);

    setTimeout(() => {
        btn.closest('.btnBlock').querySelector('video').play()
        
        btn.closest('.btnBlock').querySelector('video').addEventListener('ended', () => {
            btn.closest('.btnBlock').querySelector('video').insertAdjacentHTML('beforebegin', nameVideo);
        }, { once: true });
    }, 2000);

};
