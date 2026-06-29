const backPage = document.querySelector('.btnBack');

backPage.onclick = () => {
    
    setTimeout(() => document.location.href = `../index.html`, 1000);
    
    backPage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
    backPage.classList.remove('pulse');

    setTimeout(() => {
                backPage.innerHTML = 'Назад';
                backPage.classList.add('pulse');
            }, 1000);
    
};