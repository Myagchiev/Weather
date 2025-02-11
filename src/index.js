import './style.css';
import './reset.css';
import './animation.css';
import 'process/browser';
import dotenv from 'dotenv';  // Импортируем dotenv для работы с .env

dotenv.config();  // Загружаем .env

const apiKey = process.env.WEATHER_API_KEY; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'; 


async function getWeather(city) {

  document.getElementById('loader').style.display = 'block';
  document.getElementById('weather').style.display = 'none';

  const url = `${BASE_URL}?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`City not found: ${city}`);
    }

    const data = await response.json();
    
    const { main, weather, wind } = data;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    const windSpeed = wind.speed;


    displayWeather(city, temperature, weatherDescription, windSpeed);
  } catch (error) {
    console.error('Error fetching weather:', error);
    alert('Ошибка! Не удалось получить данные о погоде.');
  } finally {

    document.getElementById('loader').style.display = 'none';
    document.getElementById('weather').style.display = 'block';
  }
}

function displayWeather(city, temperature, description, windSpeed) {
  document.getElementById('cityName').textContent = `Weather in ${city}`;
  document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
  document.getElementById('description').textContent = `Description: ${description}`;
  document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} m/s`;
}

document.getElementById('getWeatherButton').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city!');
  }
});




/// LOGO
import logo from './assets/images/reshot-icon-ozon-layer-F4PT2JVEWX.svg';

// Проверка, не существует ли уже элемента с логотипом
const existingLogo = document.querySelector('#header img');
if (!existingLogo) {
  // Создаём новый элемент img
  const logoImg = document.createElement('img');

  // Устанавливаем атрибуты для изображения
  logoImg.src = logo;
  logoImg.alt = 'Logo';
  logoImg.style.width = '50px';  // Вы можете задать размер
  logoImg.style.height = '50px'; // Устанавливаем высоту

  // Находим элемент #header
  const header = document.getElementById('header');

  // Вставляем изображение в #header
  header.insertBefore(logoImg, header.firstChild); // Вставляем логотип в начало
}
