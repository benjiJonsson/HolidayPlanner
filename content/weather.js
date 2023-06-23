function queryWeather() {
        const apiKey = '2654d06e65bd3dc4726713a79c4254bb';
        // const query = 'St-Andrews';
        const query = document.getElementById("location").value;
        const apiUrl = "http://api.weatherstack.com/current?access_key=${apiKey}&query=${query}";

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const location = data.location.name;
                const temperature = data.current.temperature;
                const description = data.current.weather_descriptions[0];
                window.alert("temperature:" + temperature)
                const weatherInfo = `It is currently ${temperature} degrees Celsius and ${description} in ${location}.`;

            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }