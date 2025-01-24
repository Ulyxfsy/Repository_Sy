let weather = {
    "apiKey": "17494bc0e5ee91e8a29e91068329aa58",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        //function to display all the elements on the pg n replace content
        const { name } = data;
        const { icon,  description } = data.weather[0];
        const { temp, humidity} = data.main; 
        const { speed } = data.wind;
       // console.log(name, icon,description, temp, humidity,speed); //use for testing

       //display weather data details
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        //for loading, removal of loading class
        document.querySelector(".weather").classList.remove("loading");

        //dynamically set bg based on searched city
        ///PROBLEM HERE, UNABLE TO DYNAMICALLY DISPLAY BG IKUT NAMA CITY
       // document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600×900/?" + name + "')";
        //TRYOUT:
       // document.getElementById('img-container').innerHTML = '<img src="https://source.unsplash.com/random/1600×900' + name +'">';

       //TEST FROM BLACKBOX
        const backgroundImageContainer = document.querySelector(".background-image-container");
        const backgroundImageUrl = "https://source.unsplash.com/random/1600x900/?" + encodeURIComponent(name);
        backgroundImageContainer.style.backgroundImage = "url(" + backgroundImageUrl + ")";
        
        //
        
    },
    search: function(){
        //fetch weather base on input, get content of search bar
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

//to make search bar function and able to get content
document.querySelector(".search button").addEventListener("click" , function(){
weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") { //when press enter key in search bar it searches
        weather.search();
    }
});

// Initial weather fetch for "Denver" on page load
weather.fetchWeather("Denver");