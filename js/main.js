let countryName = document.querySelector("#country");
let wrapper = document.querySelectorAll(".wrapper");
let degree = document.querySelector("#degree");
let wind = document.querySelector("#wind");
let otherDays = document.querySelector("#root");
let input = document.querySelector("input");
let weatherByHours = document.querySelector(".weather-by-hours");
let arr;
let diff = null;

input.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    const urlsrc =
      weathercast +
      `q=${event.target.value}&appid=fd48bdf8a8b87b3c140f17625f4e2d57&units=metric`;
    getWeather(urlsrc);
  }
  console.log(event);
});

let lat;
let lon;
let urlsrc;
let weatherUrl;
let weathercast = "https://api.openweathermap.org/data/2.5/forecast?";
let weatherList = null;

function updateData(lat, lon) {
  weatherUrl = `lat=${lat}&lon=${lon}&appid=fd48bdf8a8b87b3c140f17625f4e2d57&units=metric`;
  return weathercast + weatherUrl;
}

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition((res) => {
    lat = res.coords.latitude;
    lon = res.coords.longitude;
    urlsrc = updateData(lat, lon);
    getWeather(urlsrc);
  });
});

function getWeather(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      countryName.textContent = res.city.name;
      degree.textContent = `${res.list[0].main.temp}C`;
      wind.textContent = " " + res.list[0].wind.speed;
      wrapper[1].lastElementChild.src = `http://openweathermap.org/img/w/${res.list[0].weather[0].icon}.png`;
      divCreation(res.list);
      weatherList = res.list;
    });
}

function divCreation(list) {
  let arr = list;
  for (let i = 0; i < list.length; i += 8) {
    let container = document.createElement("div");
    let title = document.createElement("h2");
    let dayOfMonth = new Date(list[i].dt_txt);
    let data = dayOfMonth.toDateString();
    title.textContent = data;

    let icon = document.createElement("img");
    icon.src = `http://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;

    let degree = document.createElement("div");
    degree.textContent = `${list[i].main.temp}C`;

    let humidity = document.createElement("div");
    humidity.innerHTML = `${list[i].main.humidity} <i class="fa fa-tint"></i>`;

    let description = document.createElement("div");
    description.innerHTML = `${list[i].weather[0].description}`;
    container.append(title);
    container.append(icon);
    container.append(degree);
    container.append(humidity);
    container.append(description);

    container.addEventListener("click", () => {
      console.log(i);
      let from = i - diff;
      let to = i - diff + 8;
      if (i === 0) {
        const nextDayIndex = weatherList.findIndex(
          (weather) => new Date(weather.dt_txt).getHours() === 0
        );
        from = i;
        to = nextDayIndex;
        diff = 8 - nextDayIndex;
      }
      listCreation(from, to);
    });

    otherDays.append(container);
    container.classList.add("container");
    humidity.classList.add("humid");
  }
  return arr;
}

// otherDays.addEventListener("click", (event) => {
//   console.log(event.target);
//   if (event.target.tagName === "DIV") {
//     listCreation(arr, event.target);
//   } else return;
// });

function listCreation(from, to) {
  weatherByHours.innerHTML = "";

  for (let i = from; i < to; i++) {
    let container = document.createElement("div");
    let title = document.createElement("h2");
    let dayOfMonth = weatherList[i].dt_txt;
    let data = dayOfMonth.split(" ")[1];
    title.textContent = data;

    let icon = document.createElement("img");
    icon.src = `http://openweathermap.org/img/w/${weatherList[i].weather[0].icon}.png`;

    let degree = document.createElement("div");
    degree.textContent = `${weatherList[i].main.temp}C`;

    let humidity = document.createElement("div");
    humidity.innerHTML = `${weatherList[i].main.humidity} <i class="fa fa-tint"></i>`;

    let description = document.createElement("div");
    description.innerHTML = `${weatherList[i].weather[0].description}`;

    container.append(title);
    container.append(icon);
    container.append(degree);
    container.append(humidity);
    container.append(description);
    weatherByHours.append(container);
    container.classList.add("container");
    humidity.classList.add("humid");
  }
}

// let countryName = document.querySelector("#country");
// let wrapper = document.querySelectorAll(".wrapper");
// let degree = document.querySelector("#degree");
// let wind = document.querySelector("#wind");
// let otherDays = document.querySelector("#root");
// let input = document.querySelector("input");

// input.addEventListener("keyup", (event) => {
//   console.log(event);
//   if (event.code === "Enter") {
//     const urlsrc =
//       weathercast +
//       `q=${event.target.value}&appid=fd48bdf8a8b87b3c140f17625f4e2d57&units=metric`;
//     getWeather(urlsrc);
//   }
// });

// let lat;
// let lon;
// let urlsrc;
// let weatherUrl;
// let weathercast = "https://api.openweathermap.org/data/2.5/forecast?";

// function updateData(lat, lon) {
//   weatherUrl = `lat=${lat}&lon=${lon}&appid=fd48bdf8a8b87b3c140f17625f4e2d57&units=metric`;
//   return weathercast + weatherUrl;
// }

// window.addEventListener("load", () => {
//   navigator.geolocation.getCurrentPosition((res) => {
//     lat = res.coords.latitude;
//     lon = res.coords.longitude;
//     urlsrc = updateData(lat, lon);
//     getWeather(urlsrc);
//   });
// });

// function getWeather(url) {
//   fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       countryName.textContent = res.city.name;
//       degree.textContent = `${res.list[0].main.temp}C`;
//       wind.textContent = " " + res.list[0].wind.speed;
//       wrapper[1].lastElementChild.src = `http://openweathermap.org/img/w/${res.list[0].weather[0].icon}.png`;
//       divCreation(res.list);
//     });
// }

// function divCreation(list) {
//   for (let i = 0; i < list.length; i += 8) {
//     let container = document.createElement("div");
//     let title = document.createElement("h2");
//     let dayOfMonth = new Date(list[i].dt_txt);
//     let data = dayOfMonth.toDateString();
//     title.textContent = data;

//     let icon = document.createElement("img");
//     icon.src = `http://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;

//     let degree = document.createElement("div");
//     degree.textContent = `${list[i].main.temp}C`;

//     let humidity = document.createElement("div");
//     humidity.innerHTML = `${list[i].main.humidity} <i class="fa fa-tint"></i>`;

//     let description = document.createElement("div");
//     description.innerHTML = `${list[i].weather[0].description}`;
//     container.append(title);
//     container.append(icon);
//     container.append(degree);
//     container.append(humidity);
//     container.append(description);

//     otherDays.append(container);
//     container.classList.add("container");
//     humidity.classList.add("humid");
//   }
// }

// otherDays.addEventListener("click", (event) => {
//   console.log(event);
// });
