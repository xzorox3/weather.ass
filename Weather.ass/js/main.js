const APIKey = `e5037c0a46804d8483a225943240201`;
const baseUrl = `https://api.weatherapi.com/v1/`;
const container = document.querySelector("#container");
const searchInput = document.querySelector("input");
let weatherData = {};

const getDateDetails = (dates) => {
    const dateDetails = new Date(dates);
    const weekDay = dateDetails.toLocaleString("en-US", { weekday: "long" });
    const day = dateDetails.toLocaleString("en-US", { day: "2-digit" });
    const month = dateDetails.toLocaleString("en-US", { month: "long" });
    return { weekDay, day, month };
}


const displayWeatherData = (array) => {
    let cartona = ``;
    for (let i = 0; i < array.length; i++) {
        const { weekDay, day, month } = getDateDetails(array[i].date);
        cartona += `<div class="col-md-6 col-lg-4">
                        <div class="card text-info">
                            <div class="d-flex justify-content-between align-items-center fs-3">
                                ${i === 0 ? `
                                    <p>${weekDay}</p>
                                <p>${day} ${month}</p>
                                    ` : `<p>${weekDay}</p>`}
                            </div>
                            <div class="fs-4">
                            ${i === 0 ? `
                                <p class="text-start">
                                    ${weatherData.location.name}
                                </p>
                                `: ""}
                                <div class="d-flex flex-column justify-content-between align-items-center">
                                ${i === 0 ? `
                                    <p class="display-2 fw-bold">
                                        ${weatherData.current.temp_c} &deg;C
                                    </p>
                                    <img src="${weatherData.current.condition.icon}" alt="Weather Logo">` : `
                                    <p>${array[i].day.maxtemp_c} &deg;C</p>
                                    <p>${array[i].day.mintemp_c} &deg;C</p>
                                    <img src="${array[i].day.condition.icon}" alt="Weather Logo"/>
                                    `}
                                </div>

                                
                                <p class="text-center fs-3">
                                    ${i === 0 ? `${weatherData.current.condition.text}` :
                                    `${array[i].day.condition.text}`}
                                </p>
                            </div>
                            ${i === 0 ? `
                                <div class="d-flex justify-content-between align-items-center py-2">
                                <span>
                                    <i class="fa-solid fa-umbrella"></i>
                            ${array[0].day.daily_chance_of_rain}%
                                </span>
                                <span>
                                    <i class="fa-solid fa-wind"></i>
                                    ${array[0].day.maxwind_kph} KM/H
                                </span>
                                <span>
                                    <i class="fa-solid fa-compass"></i>
                                    ${weatherData.current.wind_dir}
                                </span>
                            </div>
                                ` : ``}
                        </div>
                    </div>`;
    }
    container.innerHTML = cartona;
}

const getWeatherData = async (searchParamter = "cairo") => {
    if (searchParamter.length === 0) getWeatherData();
    if (searchParamter.length < 3) return;
    try {
        let response = await fetch(`${baseUrl}forecast.json?key=${APIKey}&q=${searchParamter}&days=3`);
        response = await response.json();
        weatherData = response;
        displayWeatherData(weatherData.forecast.forecastday);
    } catch (error) {
        console.log(error);
    }
}



searchInput.addEventListener("input", (e) => {
    getWeatherData(e.target.value);
})

window.navigator.geolocation.getCurrentPosition((data) => {
    getWeatherData(`${data.coords.latitude},${data.coords.longitude}`);
}, () => {
    getWeatherData();
})