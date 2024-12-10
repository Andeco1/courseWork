let captchaStage = 1;
let captchaValue;

const form = document.getElementById('subscribeForm');
const captchaTextContainer = document.getElementById('captchaTextContainer');
const captchaText = document.getElementById('captchaText');
const captchaInput = document.getElementById('captchaInput');

const captchaSumContainer = document.getElementById('captchaSumContainer');
const captchaSumText = document.getElementById('captchaSumText');
const captchaSumInput = document.getElementById('captchaSumInput');

const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');
const newCaptchaBtn = document.getElementById('newCaptchaBtn');

// Функция генерации случайной капчи с буквами разного регистра
function generateLetterCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    captchaValue = '';
    for (let i = 0; i < 6; i++) {
        captchaValue += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captchaText.textContent = captchaValue; // обновляем текст капчи
    captchaTextContainer.classList.remove('hidden');  // показываем поле с капчей
    captchaSumContainer.classList.add('hidden');      // скрываем поле числовой капчи
    captchaInput.value = '';                          // очищаем поле ввода
    captchaStage = 1;
}

// Функция генерации капчи с числами (сумма)
function generateSumCaptcha() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    captchaValue = num1 + num2;
    captchaSumText.textContent = `${num1} + ${num2}`;  // обновляем текст капчи
    captchaTextContainer.classList.add('hidden');       // скрываем поле буквенной капчи
    captchaSumContainer.classList.remove('hidden');     // показываем поле числовой капчи
    captchaSumInput.value = '';                         // очищаем поле ввода
    captchaStage = 2;
}

// Функция для проверки пустого ввода
function isEmpty(obj) {
    return !obj || obj.trim().length === 0;
}

// Обновить капчу при нажатии на кнопку "Другая капча"
newCaptchaBtn.addEventListener('click', () => {
    submitBtn.disabled = true;  // Отключаем кнопку, пока новая капча не будет введена
    errorMessage.textContent = ''; // Сбрасываем сообщение об ошибке

    if (captchaStage === 1) {
        generateLetterCaptcha();  // Генерируем новую капчу с буквами
    } else if (captchaStage === 2) {
        generateSumCaptcha();  // Генерируем новую числовую капчу
    }
});

// Проверка капчи при вводе данных
form.addEventListener('input', () => {
    errorMessage.textContent = ''; // Очистка сообщения об ошибке
    if (captchaStage === 1) {
        if (captchaInput.value === captchaValue) {
            submitBtn.disabled = false; // Активируем кнопку, если капча правильная
        } else {
            submitBtn.disabled = true; // Отключаем кнопку
        }
    } else if (captchaStage === 2) {
        if (parseInt(captchaSumInput.value) === captchaValue) {
            submitBtn.disabled = false; // Активируем кнопку, если сумма верная
        } else {
            submitBtn.disabled = true; // Отключаем кнопку
        }
    }
});

// Событие отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isEmpty(document.getElementById('email').value)) {
        errorMessage.textContent = 'Пожалуйста, введите email.';
        return;
    }

    if (captchaStage === 1 && captchaInput.value !== captchaValue) {
        errorMessage.textContent = 'Неправильная капча. Попробуйте снова.';
        generateSumCaptcha(); // Генерируем числовую капчу
    } else if (captchaStage === 2 && parseInt(captchaSumInput.value) !== captchaValue) {
        errorMessage.textContent = 'Неправильный ответ. Попробуйте снова.';
        generateSumCaptcha(); // Перегенерируем числовую капчу
    } else {
        errorMessage.textContent = 'Подписка оформлена!';
        submitBtn.disabled = true;
    }
});

// Инициализация капчи
generateLetterCaptcha();