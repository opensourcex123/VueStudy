var app =new Vue({
	el:"#player",
	data: {
		query:'',
		musiclist:[],
		musicUrl:"",
		imgUrl:"",
		mvUrl:"",
		hotComments:[],
		isPlaying: false,
		isShow: false
	},
	methods: {
		searchMusic: function() {
			var that = this
			axios.get("https://autumnfish.cn/search?keywords=" + this.query)
			.then(function(response) {
				that.musiclist = response.data.result.songs
			}, function(err) {
				console.log(err)
			})
		},
		// 播放音乐
		playMusic: function(musicId) {
			// 歌曲id获取
			this.musicUrl = "https://music.163.com/song/media/outer/url?id="+ musicId +".mp3"
			var that = this
			// 歌曲详情获取
			axios.get("http://localhost:3000/song/detail?ids=" + musicId)
			.then(function(response) {
				that.imgUrl = response.data.songs[0].al.picUrl
			}, function(err) {
				console.log(err)
			})
			// 歌曲评论获取
			axios.get("http://localhost:3000/comment/music?limit=1&&id=" + musicId)
			.then(function(response) {
				that.hotComments = response.data.hotComments
			}, function(err) {
				console.log(err)
			})
		},
		play: function() {
			this.isPlaying = true
		},
		pause: function() {
			this.isPlaying = false
		},
		// 播放mv
		playMv: function(mvId) {
			var that = this
			axios.get("http://localhost:3000/mv/url?id=" + mvId)
			.then(function(response) {
				that.isShow = true
				that.mvUrl = response.data.data.url
			}, function(err) {
				console.log(err)
			})
		},
		// 隐藏遮罩层
		hide: function() {
			this.isShow = false
		}
	}
})