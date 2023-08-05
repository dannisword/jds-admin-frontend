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
      <el-form
        style="width: 500px"
        ref="refForm"
        label-width="auto"
        auto-complete="on"
        :inline="false"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="Project Name"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.projectName"
            >
              <el-input
                v-model="entity.projectName"
                @blur="handleValid('code')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
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

          <el-col :span="24">
            <el-form-item
              label="Stage"
              :rules="[{ required: true, trigger: 'blur' }]"
              :error="formError.stage"
            >
              <el-input
                v-model="entity.stage"
                @blur="handleValid('stage')"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Start Date">
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="Gerber Out Date">
              <el-date-picker v-model="entity.startDate"> </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="ECAD">
              <el-input v-model="entity.stage"></el-input>
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
