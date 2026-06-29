// Активация карточек при клике
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', function() {
                // Убираем активный класс у всех карточек в той же секции
                const parentSection = this.closest('.menu-section');
                parentSection.querySelectorAll('.option-card').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Добавляем активный класс текущей карточке
                this.classList.add('active');
            });
        });
        
        
        // Обработка кнопки "Начать игру"
        document.querySelector('.btn-primary').addEventListener('click', function() {
            const activeMode = document.querySelector('.menu-section:nth-child(1) .option-card.active .option-title').textContent;
            //const activeDifficulty = document.querySelector('.menu-section:nth-child(2) .option-card.active .option-title').textContent;

            if (activeMode === 'Музыкальное лото') {
                setTimeout(() => document.location.href = `./pages/startLoto.html`, 1000);
            } else if (activeMode === 'Квиз') {
                setTimeout(() => document.location.href = `./pages/startQuiz.html`, 1000);
            };
            
            //alert(`Игра начинается!\nРежим: ${activeMode}\nСложность: ${activeDifficulty}`);
            
            // Добавляем анимацию
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            this.classList.remove('pulse');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-play"></i> Начать игру';
                this.classList.add('pulse');
            }, 2000);
        });

        //Обработка кнопки "Инструкции"
        document.querySelector('.btn-secondary').addEventListener('click', function() {

            setTimeout(() => document.location.href = `./pages/addSongAndVideo.html`, 1000);

            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            this.classList.remove('pulse');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cog"></i> Инструкции';
                this.classList.add('pulse');
            }, 2000);

        });
        
        // Эффект наведения на кнопки
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });