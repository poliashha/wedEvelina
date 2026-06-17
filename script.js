const scriptURL =
  "https://script.google.com/macros/s/AKfycbzYTAfx_BqL136UhhjJNeGZnaUFsnxg5Kn-9SeyME48n6unPpRNZklUnIQ2pAKHgYQf/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";
  const drinks = formData.getAll("drinks");
  const submitButton = document.querySelector(".button");
  submitButton.textContent = "Отправка...";
  // Преобразуем массив в строку с разделителем (например, запятая)
  const drinksString = drinks.join(", ");

  // Создаем новый FormData и добавляем все поля
  const newFormData = new FormData();
  newFormData.append("name", formData.get("name"));
  newFormData.append("presence", formData.get("presence"));
  newFormData.append("eat", formData.get("eat") || "-");
  newFormData.append("drinks", drinksString);
 
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: newFormData,
    });
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
    form.reset(); // Очищаем форму
  } catch (error) {
    formSendResult.textContent = "Повторите попытку позже.";
    console.error(error);
  } finally {
    // Возвращаем кнопку в исходное состояние
    submitButton.textContent = "Отправить";
  }
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});

const audioBtn = document.getElementById("audioBtn");

function handleScroll() {
  // Получаем позицию кнопки относительно документа
  const btnRect = audioBtn.getBoundingClientRect();
  const scrollY = window.scrollY;

  // Исходная позиция кнопки (запоминаем при первом вызове)
  if (!audioBtn.dataset.originalTop) {
    audioBtn.dataset.originalTop = btnRect.top + scrollY;
  }

  const originalTop = parseFloat(audioBtn.dataset.originalTop);

  // Если докрутили до кнопки или ниже
  if (scrollY >= originalTop) {
    audioBtn.classList.add("fixed");
  } else {
    audioBtn.classList.remove("fixed");
  }
}

// Слушаем событие прокрутки
window.addEventListener("scroll", handleScroll);
// Вызываем один раз при загрузке, чтобы установить начальное состояние
handleScroll();

function startCountdown(targetDate) {
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("timer").style.display = "none";
      document.getElementById("datetime").textContent = "Мы стали семьей!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

const audio = new Audio("./audio/music.mp3");
audio.loop = true;
audio.volume = 0.5;

const btn = document.getElementById("audioBtn");
const img = btn.querySelector(".music");
let isPlaying = false;

// Пытаемся запустить музыку при загрузке


// Управление по клику
btn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    img.data = "./img/off.svg";
  } else {
    audio.play();
    isPlaying = true;
    img.data = "./img/on.svg";
  }
});

// Если автовоспроизведение заблокировано - запускаем по первому клику в любом месте


const newYear = new Date(2026, 8, 9, 12, 30, 0).getTime();
startCountdown(newYear);

const button = document.querySelector(".button");
button.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

button.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});

function initScrollAnimation() {
  const containers = document.querySelectorAll(".conteiner");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });
  containers.forEach((container) => {
    observer.observe(container);
  });
}
document.addEventListener("DOMContentLoaded", initScrollAnimation);

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".box-text");

  // Создаём наблюдатель за пересечениями
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Если элемент появился в зоне видимости
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2, // элемент считается видимым, когда 20% его площади на экране
      rootMargin: "0px 0px -50px 0px", // небольшой отступ для более плавного появления
    },
  );

  // Начинаем наблюдать за каждым элементом
  items.forEach((item) => {
    observer.observe(item);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const heart = document.querySelector(".heartbig");
  const calendarBlock = document.querySelector(".box-calendar");

  if (!heart || !calendarBlock) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Добавляем класс для появления
          heart.classList.add("visible");

          // Опционально: добавляем пульсацию через небольшую задержку
          setTimeout(() => {
            heart.classList.add("pulse");
          }, 300);

          // Отключаем наблюдение, чтобы анимация сработала только 1 раз
          observer.unobserve(calendarBlock);
        }
      });
    },
    {
      threshold: 0.3, // 30% блока должно быть видно
      rootMargin: "0px 0px -50px 0px",
    },
  );

  observer.observe(calendarBlock);
});