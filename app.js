let arrayOfTheli = []
let arrayOfWeatherType = ["Clouds","Rain","Snow","Clear"]
let arrayOfWeatherTypeIcons = document.querySelectorAll(".weather_stat_icons")
let stats = document.querySelectorAll("span")
let cityName = "Tbilisi"
let cityNameText = document.getElementById("City_name_text")
cityNameText.textContent =  cityName
let searchBar = document.getElementById("Search_bar")
let cityListContainer = document.getElementById("city_list")
let startingAnimationFinished = false
let test = 2
let sunEffect =  document.getElementById("Decororation_image")
let rainEffect = document.querySelector('.rain')
let snowEffect = document.querySelector(".snow")
let cloudsEffect = document.querySelectorAll(".Clouds")
let informationalBar = document.getElementById("information_container")
let MountainsEffect = document.querySelector(".mountains")
let birdsEffect = document.querySelector(".birds")



function createCityList() {fetch("./city.json") //get city list from json file for search bar recomendations
.then(res => {
    return res.json()
})
.then(data => {
    arrayOfTheli = data.cities.map(Object => {
        let elemet = document.createElement("li")
        let node = document.createTextNode(Object.city)
        elemet.appendChild(node)
        elemet.classList.add("hiden")
        return {name: Object.city, elemet: elemet}
    })
    addListInTheUl()
    searchCity()
    changeCityName()
    changeCityNameAfterClick()
    function searchCity(){
        searchBar.addEventListener("input", () => {
            let inputVal =  searchBar.value.toLowerCase()
            arrayOfTheli.forEach(object => {
                if(object.name.toLowerCase().includes(inputVal) && inputVal != "" ){
                    console.log(inputVal.length)
                    object.elemet.classList.remove("hiden")
                    cityListContainer.style.display = ("block")
                }
                else{
                    object.elemet.classList.add("hiden") 
                }
            })
        })
    }
    function changeCityName(){
        arrayOfTheli.forEach(object => {
            object.elemet.addEventListener("click", () => {
                cityListContainer.style.display = ("none")
                searchBar.value = ""
                object.elemet.classList.add("hiden") 
                startingAnimationFinished = false
                removeClassForWeatherDecorationImages()
                cityName = object.name
                cityNameText.textContent =  cityName
                getWeatherInfo()
            })
        })
    }
    function changeCityNameAfterClick(){
            document.getElementById("search_icon").addEventListener("click", () => {
                if(searchBar.value !=""){
                    startingAnimationFinished = false
                    cityListContainer.style.display = ("none")
                    removeClassForWeatherDecorationImages()
                    cityName = searchBar.value
                    cityName = cityName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
                    cityNameText.textContent =  cityName
                    console.log(cityName)
                    getWeatherInfo()
                }
            })
    }

    // document.getElementById("city_list").appendChild(elemet)
})
}

function getWeatherInfo(){//get weather data from Openweathersmap api
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=61820ac0ea4397c1e5bda2ef1055c23e")
    .then(res => {
        if(res.ok == true){
            document.getElementById("information_container").style.display = "flex"
            document.getElementById("warning_text").style.display = ("none")
            return res.json()
        }
        else{
            document.getElementById("information_container").style.display = "none"
            document.getElementById("warning_text").style.display = ("block")
        }
        
    })
    .then(data => {
        console.log(data)
        startingAnimation(data.weather[0].main)
        ChooseWeatherIconBasedOnWeather(data.weather[0].main)
        giveStatsValues(data.main.temp,data.weather[0].main,data.main.temp_max,data.main.humidity,data.main.temp_min,data.wind.speed)
    })
}

function startingAnimation(x){//starting animation for every element
    if(!startingAnimationFinished){
        if(x == "Clear"){
            setTimeout(() => {
            sunEffect.classList.add("inside_of_the_box")
            birdsEffect.classList.add("inside_of_the_box_bottom")
        }, 400)
        }
        else if(x == "Clouds"){
            setTimeout(() => {
            cloudsEffect[0].classList.add("inside_of_the_box")
            cloudsEffect[1].classList.add("inside_of_the_box_left")
            MountainsEffect.classList.add("inside_of_the_box")
        }, 400)
        }
        else if(x == "Rain"){
            setTimeout(() => {
            cloudsEffect[0].classList.add("inside_of_the_box")
            cloudsEffect[1].classList.add("inside_of_the_box_left")
            rainEffect.classList.add("inside_of_the_box_top")
            MountainsEffect.classList.add("inside_of_the_box")
            }, 400)
        }
        else if(x = "Snow"){
            setTimeout(() => {
            snowEffect.classList.add("inside_of_the_box_top")
            cloudsEffect[0].classList.add("inside_of_the_box")
            cloudsEffect[1].classList.add("inside_of_the_box_left")
            MountainsEffect.classList.add("inside_of_the_box")
        }, 400)
        }
        setTimeout(() => {
            document.getElementById("Weather_information_container").classList.add("width")
        }, 1200)
        setTimeout(() => {
            document.getElementById("search_bar_container").classList.add("opacity1")
            informationalBar.classList.add("opacity1")
        }, 1500)
    }
}

function addListInTheUl(){//for create li element inside of html ul element for city search bar list
    arrayOfTheli.forEach(object => {
        cityListContainer.appendChild(object.elemet)
    })   
}

function removeClassForWeatherDecorationImages(){//removing all animation clases and prepare elements for second animations
    cloudsEffect[0].classList.remove("inside_of_the_box")
    cloudsEffect[1].classList.remove("inside_of_the_box_left")
    sunEffect.classList.remove("inside_of_the_box")
    rainEffect.classList.remove("inside_of_the_box_top")
    informationalBar.classList.remove("opacity1")
    MountainsEffect.classList.remove("inside_of_the_box")
    snowEffect.classList.remove("inside_of_the_box_top")
    birdsEffect.classList.remove("inside_of_the_box_bottom")
}

function ChooseWeatherIconBasedOnWeather(x){//Choose weather icon based on wehather type
    arrayOfWeatherTypeIcons.forEach(icon => {
        icon.classList.add("hiden")
    })
    for(let i = 0; i < arrayOfWeatherTypeIcons.length; i++){  
        if(x == arrayOfWeatherType[i])
        arrayOfWeatherTypeIcons[i].classList.remove("hiden")
    }
}

function giveStatsValues(x,y,z,i,j,k){//give stats real values
    stats[0].textContent = Math.round(x) + " °C"
    stats[1].textContent = y
    stats[2].textContent = Math.round(z) + " °C"
    stats[3].textContent = Math.round(i)
    stats[4].textContent = Math.round(j) + " °C"
    stats[5].textContent = Math.round(k) + " ms"
}

getWeatherInfo()
createCityList()