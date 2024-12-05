document.addEventListener("DOMContentLoaded", function () {
    const planetsContainer = document.getElementById('planets-container');

    // Функция для получения параметра id из URL
    function getPlanetIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Возвращает значение параметра id
    }

    const planetId = getPlanetIdFromUrl(); // Получаем id планеты из URL

    if (!planetId) {
        planetsContainer.innerHTML = "<p>Не указан параметр планеты в URL.</p>";
        return;
    }

    // Загружаем данные из planets.txt
    fetch('info.json')
        .then(response => response.text()) // Получаем текстовый ответ
        .then(data => {
            const planetsData = JSON.parse(data); // Преобразуем в JSON
            displayPlanet(planetsData, planetId);
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных: ", error);
            planetsContainer.innerHTML = "<p>Не удалось загрузить данные о планетах.</p>";
        });

    // Функция для отображения выбранной планеты на странице
    function displayPlanet(planetsData, planetId) {
        const planet = planetsData[planetId];

        if (!planet) {
            planetsContainer.innerHTML = `<p>Планета с id "${planetId}" не найдена.</p>`;
            return;
        }

        // Формируем HTML-код для выбранной планеты
        const html = `
            <section class="planet">
                <h2 class="name">${planet.title}</h2>
                <div class="img"> 
                <img src="${planet.imgSrc}" alt="${planet.title}"></div>
                <div class="description">Описание: ${planet.description}</div>
                <div class="year"><strong>Год обнаружения:</strong> ${planet.year}</div>
                <div class="fact"><strong>Интересный факт:</strong> ${planet.fact}</div>
                <div class="literature">
                <h3>Литература:</h3>
                <ul>
                    ${planet.literature.map(book => `
                        <li><strong>${book.title}</strong> — ${book.author} (${book.publisher}, ${book.year})</li>
                    `).join('')}
                </ul>
                </div>
            </section>
        `;

        // Вставляем HTML в контейнер
        planetsContainer.innerHTML = html;
    }
});
