<script lang="ts" setup>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import AppMain from "./AppMain.vue";
import TagsView from "./TagsView.vue";
import { resizeHandler } from "../hooks/resize-handle";
import { useApp } from "../store/useApp";
import { storeToRefs } from "pinia";
import sidebarlogo from "../assets/Jabil-One-w.svg";
resizeHandler();

const app = useApp();
const { collapse, user } = storeToRefs(app);

const onToggle = () => {
    collapse.value = !collapse.value;
};

const classObj = computed(() => {
    return {
        closeSidebar: collapse.value,
    };
});
</script>

<template>
    <!-- 多國語言 -->
    <ConfigGlobal>
        <div :class="classObj" class="app-wrapper">
            <!-- sider -->
            <el-header class="header">
                <router-link class="sidebar-logo-link" to="/">
                    <img class="logo" :src="sidebarlogo" />
            </router-link>
            ECAD System
            </el-header>
            <el-container>
                <div class="aside">
                    <Sidebar :collapse="collapse" class="sidebar-container" />
                </div>
                <div class="main">
                    <!-- nav-->
                    <div :class="{ 'fixed-header': true }">
                        <Navbar @on-toggle="onToggle" />
                    </div>
                    <TagsView></TagsView>
                    <!-- AppMain -->
                    <AppMain />
                </div>
            </el-container>
            <el-footer class="footer">© Jabil Inc. 2023. All Rights Reserved</el-footer>
        </div>
    </ConfigGlobal>
</template>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow: hidden;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.container {
    height: 100vh;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
}

.header {
    background: #002b49;
    height: 50px;
    color: #ffff;
    padding: 13px;
    font-weight: 500;
}

.logo {
    max-width: 100%;
    width: 70px;
}
.footer {
    height: 40px;
    text-align: center;
    padding: 10px;
    background: #ebebeb;
    font-size: 10px;
}

.aside {
    flex: 0 0 auto;
    max-width: --sideBar-width;
    border-right: 1px solid #efefef;
}

.main {
    flex: 1 1 auto;
    width: calc(100% - 240px);
}

.closeSidebar {
    .main {
        width: calc(100% - 90px);
    }
}
</style>
