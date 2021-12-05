var app =new Vue({
	el:"#app",
	data: {
		city:'',
		weatherlist:[]
	},
	methods: {
		searchWeather: function() {
			var that = this
			axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
			.then(function(response) {
				that.weatherlist = response.data.data.forecast
			}, function(err) {
				console.log(err)
			})
		},
		changeCity: function(city) {
			this.city = city
			this.searchWeather()
		}
	}
})