<template>
    <header class="head-nav rflex "  id='header_container'>
        <div class="left-nav rflex">
            <img class="logo" :src="logo" alt="logo" >
            <span class='title'>{{$t('commons.name')}}</span>
        </div>
  
        <div class="right-nav" ref="rightNav">
            <div class="userinfo-right rflex">
                <div class="notify-row">
                    <ul class="top-menu">
                        <li class="li-badge">
                            <el-tooltip class="item" effect="dark" content="访问github" placement="top">
                                <a href='#' target="_blank">
                                    <icon-svg icon-class="github" />
                                </a>
                            </el-tooltip>
                        </li>
                        <li class="li-badge">
                            <a href='#' target="_blank" v-popover:qcode>
                                <icon-svg icon-class="wechat" />
                                <el-popover
                                    ref="qcode"
                                    popper-class="qcodepopper"
                                    placement="bottom"
                                    trigger="hover">
                                        <div class="wechat-area cflex">
                                            <p class="titles">加我微信</p>
                                            <img :src="wechat.wechatImg" style="width:100px" alt="加我微信"  />
                                        </div>
                               </el-popover>
                            </a>
                        </li>
                        <li class="li-badge">
                            <a href='#' target="_blank" v-popover:qqcode>
						        <icon-svg icon-class="qq" />
                                 <el-popover
                                    ref="qqcode"
                                    popper-class="qcodepopper"
                                    placement="bottom"
                                    trigger="hover">
                                        <div class="wechat-area cflex">
                                            <p class="titles">加入qq群</p>
                                            <img :src="qq.qqImg" style="width:100px" alt="加入qq群"  />
                                        </div>
                                </el-popover>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="userinfo">
                    <el-menu 
                       class="el-menu-demo" 
                       mode="horizontal" 
                       >
                        <el-submenu index="1" popper-class="langItem">
                            <template slot="title">
                                <icon-svg style="font-size: 18px;" icon-class="language" />
                            </template>
                            <el-menu-item index="1-1" @click="changeLocale('zh')">
                                <span class="intro">中文</span>
                            </el-menu-item>
                            <el-menu-item index="1-2" @click="changeLocale('en')">
                                <span class="intro">EngLish</span>
                            </el-menu-item>
                        </el-submenu>

                        <el-submenu index="2"  popper-class="infoItem">
                            <template slot="title">
                                <div class='welcome'>
                                    <span class="name">{{$t('commons.hi')}},</span>
                                    <span class='name avatarname'> {{ $t(`commons.${name}`)}}</span>
                                </div>
                                <img :src="avatar" class='avatar' alt="头像">
                            </template>
                            <el-menu-item index="2-1" @click="setDialogInfo('info')">{{ $t('commons.infoShow') }}</el-menu-item>
                            <el-menu-item index="2-2" @click="setDialogInfo('pass')">{{ $t('commons.infoModify') }}</el-menu-item>
                            <el-menu-item index="2-3" @click="setDialogInfo('logout')">{{ $t('commons.quit') }}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { setToken,getToken } from '@/utils/auth'
    import wechatImg from "@/assets/img/wechat.jpg";
    import qqImg from "@/assets/img/qq.png";
    import logoImg from "@/assets/img/logo.png";
    import IconSvg from '../icons/IconSvg.vue';


    export default {
          name: 'head-nav',
          data(){
            return{
                logo:logoImg,
                wechat:{
                    wechatImg:wechatImg,
                    isWechat:false
                },
                qq:{
                    qqImg:qqImg,
                    isQq:false,
                },
                menu:{
                    userBgcolor:'#f0f2f5'
                },
            }
          },
          components:{
                    IconSvg
          },
          computed:{
            ...mapGetters(['name','avatar'])
          },
          created(){
          },
          mounted(){
          },
          methods:{
              Wechat(){
                  this.wechat.isWechat = true;
              },
              hideWechat(){
                 this.wechat.isWechat = false;
              },
              showQq(){
                  this.qq.isQq = true;
              },
              hideQq(){
                  this.qq.isQq = false;
              },
              logout(){
                  this.$store.dispatch('LogOut').then(() => {
                      location.reload();
                  })
              },
             /**
             * 弹出框-修改密码或者系统设置   
             * @param {string} cmditem 弹框类型
             */
            setDialogInfo(cmditem) {
                switch (cmditem) {
                    case 'info':
                        this.$router.push('/infoManage/infoShow/infoShow1');
                        break;
                    case 'pass':
                        this.$router.push('/infoManage/infoModify/infoModify1');
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
            },
            // 切换语言
            changeLocale(type){
                setToken('lang',type);
                this.$i18n.locale = type;
            }
          }
    }
</script>

<style scoped lang='less'>
    .head-nav {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 15;
        transition: width .2s;
        justify-content: space-between;
        height: 60px;
        width:100%;

        box-sizing: border-box;
        background: #fff;
        box-shadow:0px 2px 0px 0px rgba(230,224,224,0.5);
        .logout {
            vertical-align: middle;
            cursor: pointer;
        }
        .left-nav{
            flex: 7;
            width:100%;
            height: 60px;
            align-items: center;
            justify-content: flex-start;
            text-transform: uppercase;
            padding-left: 1em;
            box-sizing: border-box;
            .logo {
                height: 36px;
                width: 36px;
                vertical-align: middle;
                display: inline-block;
            }
            .closeLogo{
                width:30px;
                height:30px;
            }
            .title{
                font-size: 22px;
                i{
                    color:#FF6C60;
                }
            }
        }
        
        .right-nav{
    float: right;
    height: 100%;
    line-height: 60px;
            // display: flex;
            // flex: 3;
            // // width:calc(100% + 10px);
            // margin-right: 15px;
            // justify-content: space-between;
            .userinfo-right{
                width:400px;
                justify-content: space-between;
                display: flex;
                .notify-row{
                    line-height:60px;
                    flex:1;
                    ul{
                        display: flex;
                        justify-content: space-around;
                    }
                  
                }
            }
        }
    }
    .middle{
       align-items: center;
       border:1px solid;
    }
    
    .userinfo {
        line-height: 60px;
        text-align:right;
    }
    .avatar{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }
    .langAvatar{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }
    .welcome{
        display: inline-block;
        vertical-align: middle;
        padding: 0 5px;
        .name{
            line-height: 20px;
            text-align: center;
            font-size: 12px;
        }
        .avatarname{
            color:#a9d86e;
            font-weight:bolder;
            font-size: 13px;
        }
    }

    .username {
        cursor: pointer;
        margin-right: 5px;
    }
    ul.top-menu > li {
        position: relative;
    }
  
    
</style>
