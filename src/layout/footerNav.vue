<template>
	 <div class='footer'>
        <div class="intro cflex">
            <p style="font-size:28px;margin:10px;">Contact with me</p>
            <p class="rflex">
                <span>E-mail</span>
                <span>WeChat</span>
                <span>github</span>
            </p>
            <p class="beian">Copyright ©202X Diary **ICP备********号</p>

        </div>
    </div>
</template>


<script>

export default {
    name: "footerNav",
}
</script>

<style lang="less">
	.footer{
        width: 100%;
        padding: 10px 0;
        font-size:12px;
        text-align: center;
        background: #fff;
        p{
            line-height: 30px;
        }
        .intro{
            width: 340px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
            span{
                margin: 5px;
            }
        }
    }
</style>