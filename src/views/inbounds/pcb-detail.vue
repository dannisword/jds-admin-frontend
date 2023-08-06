<script setup lang="ts">
// 宣告變數
const _formError = {
  projectName: "",
  boardName: "",
  stage: "",
  startDate: "",
};

const _entity = {
  id: 0,
  projectName: "",
  boardName: "",
  stage: "",
  startDate: "",
  gerberOutDate: "",
  ecad: "",
};
const entity = reactive({ ..._entity });
const formError = reactive({ ..._formError });
const state = reactive({
  container: { isLoading: false, message: "載入中" },
});
/**
 *
 */
onBeforeMount(() => {
  console.log("onBeforeMount");
});
/**
 *
 */
onMounted(() => {
  console.log("onMounted");
});
/**
 *
 */
onUnmounted(() => {
  console.log("onUnmounted");
});

const handleValid = (name: string = "") => {
  let isValid = true;
  Object.assign(formError, _formError);
  return isValid;
};
</script>
<template>
  <el-container
    v-loading="state.container.isLoading"
    :element-loading-text="state.container.message"
  >
    <el-main>
      <h3>Project info</h3>
      <el-form
        ref="refForm"
        label-width="auto"
        auto-complete="on"
        :inline="false"
      >
        <el-row>
          <el-col :xl="12" :lg="12" :md="12">
            <el-form-item
              label="Project Name"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.projectName"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="12" :lg="12" :md="12">
            <el-form-item
              label="Border Name"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.boardName"
            >
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xl="12" :lg="12" :md="12">
            <el-form-item
              label="Stage"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.stage"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </el-col>

          <el-col :xl="12" :lg="12" :md="12">
            <el-form-item
              label="Revision"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.stage"
            >
              <el-select multiple placeholder="Plese Select"> </el-select>
            </el-form-item>
          </el-col>

          <el-col :xl="12" :lg="12" :md="12">
            <el-form-item label="Start Date">
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :xl="12" :lg="12" :md="12">
            <el-form-item label="Gerber Out Date">
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 
          <el-col :span="24">
            <el-form-item label="ECAD">
              <el-input v-model="entity.stage"></el-input>
            </el-form-item>
          </el-col>
          -->

          <el-col :span="24">
            <h3>Data Release Date</h3>
          </el-col>
          <el-col :xl="2" :lg="2" :md="2"> EF </el-col>
          <el-col :xl="22" :lg="22" :md="22">
            <el-form-item label="NetList">
              <el-input
                v-model="entity.boardName"
                @blur="handleValid('name')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary">Save</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>
<style>
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  display: flex !important;
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>
