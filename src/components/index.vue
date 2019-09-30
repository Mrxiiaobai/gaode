<template>
	<div id="index" v-cloak>
		<showMask v-bind:show="mask"></showMask>
		<div id="container"></div>
	</div>
</template>

<script>
	import MapLoader from '../../aMap.js'
	import axios from "axios"

	export default {
		name: 'index',
		data() {
			return {
				mask:true,
				lat: '', //经度
				lng: '', //纬度
				address: ''
			}
		},
		methods: {
			mapLoading(){
				let _this = this
				MapLoader().then(AMap => {
						console.log('地图加载成功')
						let mapObj = new AMap.Map('container')
						mapObj.plugin('AMap.Geolocation', function() {
							let geolocation = new AMap.Geolocation({
								zoom: 14, //设置地图显示的缩放级别
								// center: [31.201277, 121.471208],//设置地图中心点坐标
								enableHighAccuracy: true, //是否使用高精度定位，默认:true
								timeout: 10000, //超过10秒后停止定位，默认：5s
								buttonPosition: 'LB', //定位按钮的停靠位置
								buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
								zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
								// maximumAge: 0, //定位结果缓存0毫秒，默认：0
								// convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
								// showButton: true, //显示定位按钮，默认：true
								// buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
								// buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
								// showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
								// showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
								// panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
								// zoomToAccuracy: true ,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
								// // center: [Number(_this.lat), Number(_this.lng)] ,//初始化地图中心点
							});
							mapObj.addControl(geolocation);
				
							geolocation.getCurrentPosition();
				
							AMap.event.addListener(geolocation, 'complete', function(res) {
								console.log(res);
								_this.mask = false;
								_this.getValue();
								console.log(localStorage.getItem('flag'))
								setTimeout(function(){
									if(localStorage.getItem('flag') === 'true'){
										console.log('执行更新')
										_this.$axios.post('/api/setValue', {
											params: {
												user: localStorage.getItem('user'),
												lat: res.position.lat,
												lng: res.position.lng,
												address: res.formattedAddress,
											},
										}).then((res) => {
											console.log(res);
										})
									}else{
										console.log('执行插入')
										_this.$axios.post('/api/insertValue', {
												params: {
													user: localStorage.getItem('user'),
													lat: res.position.lat,
													lng: res.position.lng,
													address: res.formattedAddress,
												},
											}).then((res) => {
												console.log(res)
												_this.getValue();
										})
									}
								},0)
								
							}); //返回定位信息
							// mapObj.setCenter(31.201277, 121.471208)
							AMap.event.addListener(geolocation, 'error', function(error) {
								_this.mask = false;
								console.log('该浏览器不支持定位');
								console.log(error);
							}); //返回定位出错信息
						}, e => {
							console.log('加载错误')
							console.log(e)
						});
				
						// let marker = new AMap.Marker({
						// 		position: new AMap.LngLat(31.201277, 121.471208),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
						// 		title: '上海'
						// });
						// mapObj.add(marker);
				
						// let position = new AMap.LngLat(31.201277, 121.471208);  // 标准写法
						// // 简写 var position = [116, 39]; 
						// mapObj.setCenter(position); 
						// 获取地图中心点
						let currentCenter = mapObj.getCenter();
						console.log(currentCenter)
					});
				
			},
			getValue(){
				let _this = this;
				_this.$axios.get('/api/getValue',{
					params:{
						user:localStorage.getItem('user')
					}
				}).then((res)=>{
					console.log(res)
					let data = res.data;
					if(data.length==0){
						console.log(localStorage.getItem('flag'))
						localStorage.setItem('flag',false);
					}
					data.forEach(item=>{
						if(item.user == localStorage.getItem('user')){
							localStorage.setItem('flag',true);
						}else{
							localStorage.setItem('flag',false);
						}
					})
				})
			}
		
		},
		mounted: function() {
			let _this = this;
			if(!localStorage.getItem('user')){
				_this.$router.replace('/login')
				return
			}
			_this.mapLoading()
		}


	}
</script>

<style>
	html,body{
		margin: 0;
		padding: 0;
		height: 100%;
	}
	#index {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.scanImg {
		width: 3rem;
		height: 3.8rem;
		margin: auto;
		margin-top: 0.6rem;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

	}

	#text-img {
		display: block;
		width: 3rem;
		height: 3rem;
		border: 1px solid #ebeef5;
	}

	#text {
		width: 3rem;
		height: 3rem;
		border: 1px solid #ebeef5;
		font-size: 0.16rem;
	}

	.scanBtn {
		width: 100%;
		height: 0.3rem;
		margin-top: 0.2rem;
		position: relative;
	}

	.scanBtn button {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 1.5rem;
		height: 0.3rem;
		border: none;
		background: #67c23a;
		color: #fff;
	}

	.chooseBtn {
		width: 100%;
		height: 0.3rem;
		position: relative;
		margin-top: 0.25rem;
	}

	.chooseBtn button {
		position: absolute;
		left: 0.75rem;
		width: 1.5rem;
		height: 0.3rem;
		border: none;
		background: #3B58D4;
		color: #fff;
	}

	#container {
		width: 100%;
		height: 3rem;
		border: 1px solid #EBEEF5;
	}

	/* .amap-maps{
		height: 3.75rem !important;
	}
	.amap-layer{
		height: 3.75rem !important;
	}
	.amap-labels{
		height: 3.75rem !important;
	} */
</style>
