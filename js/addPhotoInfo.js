document.addEventListener("DOMContentLoaded", function () {
    const planetsContainer = document.getElementById('planets-container');
    function getPlanetIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
    const planetId = getPlanetIdFromUrl();
    if (!planetId) {
        planetsContainer.innerHTML = "<p>Не указан параметр планеты в URL.</p>";
        return;
    }
    fetch('info.json')
        .then(response => response.text())
        .then(data => {
            const planetsData = JSON.parse(data);
            displayPlanet(planetsData, planetId);
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных: ", error);
            planetsContainer.innerHTML = "<p>Не удалось загрузить данные о планетах.</p>";
        });

    function displayPlanet(planetsData, planetId) {
        const planet = planetsData[planetId];
        if (!planet) {
            planetsContainer.innerHTML = `<p>Планета с id "${planetId}" не найдена.</p>`;
            return;
        }
        const html = `
            <section class="planet">
                <h2 class="name">${planet.title}</h2>
                <div class="img"> 
                <img src="${planet.imgSrc}" alt="${planet.title}"></div>
                <div class="img"> 
                    <div class="loader">
                      <div class="face">
                        <div class="circle"></div>
                      </div>
                      <div class="face">
                        <div class="circle"></div>
                      </div>
                    </div>
                </div>
                <div class="description"> <t> Описание: </t>${planet.description}</div>
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
        planetsContainer.innerHTML = html;
    }
});
