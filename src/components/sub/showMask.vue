<template>
<div
    class="total_zhebiceng"
    v-show="show"
    style="0"
>
    <div class="mask_inner" v-show="!login">
		<div class="loading" data-text="Loading"></div>
		<span class="mask_inner_span">处理中</span>
	</div>
	
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            mymask: this.show,
            login:this.isLogin
        }
    },
    props: {
        show: Boolean,
        isLogin: {type:Boolean,default:false},
    },
    computed: {

    }
}
</script>

<style scoped>
	.total_zhebiceng{
		background-color: transparent;
	}
	.mask_inner{
		position: fixed;
		color: white;
		left: 1.2rem;
		bottom: 0.96rem;
		z-index: 1003;
		width:1.33rem;
		height:0.34rem;
		background-color:black;
		border-radius:1px;
		opacity:0.62;

	}
	.mask_inner_span{
		display: block;
		position: absolute;
		width:0.8rem;
		height:0.18rem;
		line-height: 0.18rem;
		top: 0.07rem;
		left: 0.4rem;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	/* 转圈 */
	.loading{
		position: absolute;
		width: 0.2rem;
		height: 0.2rem;
		top: 0.07rem;
		left: 0.20rem;
		border: 2px solid #fff;
		border-radius: 50%;
		border-top-color:#2BC97E;
		animation: don 1s linear infinite;
	}
	
	@keyframes don{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>
