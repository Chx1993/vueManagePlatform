<template>
   <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
        <div class="menu_page_list">
            <el-menu 
                class="el_menu"
                mode="vertical"
                theme="dark" 
                :show-timeout="200"
                :default-active="$route.path" 
                :collapse="isCollapse"
                :background-color="menuObj.bgColor"
                :text-color="menuObj.textColor"
                :active-text-color="menuObj.activeTextColor"
                :style="{width:sidebar.width+'px'}"
                >
                  <template v-for="(item,index) in permission_routers">
                      <!--表示 有一级菜单-->
                      <router-link v-if="!item.hidden && item.noDropdown" :to="item.path+'/'+item.children[0].path" :key="index">
                          <el-menu-item class="dropItem " 
                            :index="item.path+'/'+item.children[0].path">
                              <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" style="width:1.5em; height:1.5em; margin-left:0; margin-right:5px;" />
                              <span v-if="item.meta.title" slot="title">{{ $t(`commons.${item.name}`)}}</span> 
                          </el-menu-item>
                      </router-link>

                      <!--表示 有二级或者多级菜单 -->
                      <el-submenu v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown" 
                          :index="item.path" 
                          :key="index">
                          <template slot="title">
                              <icon-svg v-if="item.meta.icon" :icon-class="item.meta.icon" style="width:1.5em; height:1.5em;margin-left:0; margin-right:5px;" />
                              <span v-if="item.meta.title" slot="title">{{ $t(`commons.${item.name}`)}}</span>
                          </template>
                          <!--直接定位到子路由上，子路由也可以实现导航功能-->
                          <router-link v-for="(citem,cindex) in item.children" :to="getIindex(citem,item,cindex)"  :key="cindex">
                              <el-menu-item 
                                v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                                :index="getIindex(citem,item,cindex)">
                                  <span slot="title"> {{ $t(`commons.${citem.name}`)}}</span>
                              </el-menu-item> 
                          </router-link>
                      </el-submenu>
                  </template>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logoImg from "@/assets/img/logo.png";


export default {
  name: "left-Menu",
  data() {
    return {
       menuObj:{
         bgColor:'#fff',
         textColor:'#666',
         activeTextColor:'#ff6428',
       },
       logo:logoImg
    };
  },
  computed:{
      // 配置在store/modules/menu.js
      ...mapGetters([
        'permission_routers',
        'isCollapse',
        'sidebar',
        'menuIndex'
      ]),
  },
  created(){
  },
  mounted(){
  },
  methods: {
    getIindex(citem,item,cindex){
      return (citem.meta.titleList)?item.path+'/'+citem.path+'/'+citem.meta.titleList[0].path:item.path+'/'+citem.path;
    }
  }
};
</script>


<style lang="less" scoped>
@left-bgColor:#fff;  // 左侧菜单背景颜色;
@icon-link:#FF6C60;
.menu_left{
  border-top:4px solid  rgb(70, 196, 125);
  position: absolute;
  top:0;
  left:0;
  // bottom:0;
  .menu_page_list {
    width:100%;
    overflow-y: auto;
    overflow-x: hidden;
    flex:1;
    margin-top:5px;
    z-index: 10;
    box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5);
  }
}
// 1
& /deep/ .el-menu .dropItem {
  padding: 0 px !important;
}


// 2
& /deep/.el-submenu {
  padding: 0 !important;
}
& /deep/ .el-submenu__title {
  padding: 0 20px !important;
}


</style>
