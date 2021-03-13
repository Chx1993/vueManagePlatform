<template>
    <div class="home rflex">
        <head-nav class="head_nav" ></head-nav>
        <div class="middle">
            <left-menu class="menu_left"></left-menu>
            
            <div class="menu_right  el-scrollbar" ref="menu_right" :style="{left:sidebar.width+'px'}">
                <div class="menu_content" ref="menu_content">
                    <bread></bread>
                    <router-view></router-view><!--页面渲染入口-->
                </div>
                <backTop :ele="$refs.menu_right"></backTop>
                 <footerNav class="footer_nav"></footerNav>

            </div>

        </div>

    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    import HeadNav from './headNav.vue';
	import LeftMenu from './leftMenu.vue';
	import Bread from './bread.vue';
	import FooterNav from './footerNav.vue';
	import backTop from '../components//backTop';
    import ResizeMixin from './mixin/ResizeHandler'

    export default {
        name: 'home',
        data(){
            return {
            }
        },
        mixins: [ResizeMixin],
        computed:{
            ...mapGetters(['sidebar']),
        },
        components:{
            HeadNav,
            LeftMenu,
            Bread,
            FooterNav,
            backTop
        },
    }
</script>
<style scoped lang='less'>
    .home{
        position: relative;

        
        .middle{
            .menu_right{
                overflow:auto;
                position: absolute;
                right:0;
                top:0;
                // bottom:0;
                background:#F6F7FC;
                .menu_content{
                    position: relative;
                    // margin-top:60px;
                    width:100%;
                    background:#f0f2f5;
                }
            }
        } 
        .footer_nav{
            // bottom:0;
            // position: relative;
            // margin-bottom: 0;
        }      
    }
    & /deep/ .el-scrollbar::-webkit-scrollbar-thumb {
        box-shadow:0px 1px 3px rgba(0,0,0,0.3) inset;
        background-color:#FF6C60;
        border-radius: 4px;
    }
</style>
