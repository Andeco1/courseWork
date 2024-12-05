document.addEventListener('DOMContentLoaded', function() {
    const starContainer = document.querySelector('.stars');
    const starCount = 150; // Количество звезд

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 2 + 1 + 'px';
        star.style.width = size;
        star.style.height = size;

        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';

        star.style.animationDuration = Math.random() * 10 + 2 + 's';
        star.style.animationDelay = Math.random() * 5 + 's';

        starContainer.appendChild(star);
    }

    for (let i = 0; i < starCount; i++) {
        createStar();
    }
});