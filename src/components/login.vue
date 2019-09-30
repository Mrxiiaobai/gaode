<template>
	<div class="login">
		<div class="inputText">
			<div class="userText">
				<label for="">用户名</label> <input type="text" v-model="username"/>
			</div>
		</div>
		<div class="loginBtn2"><button @click="login">登录</button></div>
	</div>
</template>
<script>
	export default {
		name: "login",
		data: function() {
			return {
				username:''
			}
		},
		methods: {
			login() {
				localStorage.setItem('user',this.username)
				localStorage.setItem('flag',false)
				this.$router.push('/')
			}
		},
	}
</script>


<style scoped>
	html,
	body {
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.login{
		padding-top:2.5rem;
		height: 100%;
		position: relative;
	}
	.inputText{
		width:100%;
		height: 2.5rem;
		/* margin: 2.5rem auto; */
	}
	.userText input{
		outline: none;
		border: none;
		border-bottom: 1px solid #0085FF;
	}
	.loginBtn button{
		outline: none;
		border: none;
		width: 1.5rem;
		height: 0.3rem;
		margin-top: 0.5rem;
		background: #0085FF;
		border-radius: 1px;
		font-size: 0.16rem;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;
	}
	.loginBtn2{
		position: absolute;
		bottom: 1rem;
		left:50%;
		transform: translateX(-50%);
	}
	.loginBtn2 button{
		outline: none;
		border: none;
		width: 1.5rem;
		height: 0.3rem;
		background: #0085FF;
		border-radius: 1px;
		font-size: 0.16rem;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;
	}
</style>
