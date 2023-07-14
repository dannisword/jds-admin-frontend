<script setup lang="ts">
import * as store from "../../store";
import { useBasicStore } from "../../store/useBasicStore";
import { storeToRefs } from "pinia";
import { routeHandle } from "../../hooks/route-handle";
import { pageHandle } from "../../hooks/page-handle";
import { httpOperations } from "../../utils/http-operations";
import * as base from "../../utils";
import * as models from "../models";
import jsonData from "./inbound.json";

const page = pageHandle();
const route = routeHandle();

const basic = useBasicStore();
//#region data
// 查詢參數
const resetParams = () => {
  return {
    carrierId: "",
    createEndDateTime: "",
    createStartDateTime: "",
    sysOrderNo: "",
    subCarrierId: "",
  };
};
// DataTable
const master = {} as models.master_model;

const state = reactive({
  params: resetParams(),
  nowDate: ref(),
  fields: ref<any[]>(),
  pageable: {} as models.pageable_model,
});

//#endregion

//#region  methods
onMounted(() => {
  master.columns = jsonData.master_columns;
  master.custom = jsonData.master_columns;
  state.fields = jsonData.advanced_search;
  state.nowDate = [base.addDay(-30), base.addDay(0)];
  onLoad();
});

const onLoad = () => {
  page.container.isLoading = true;

  state.params.createStartDateTime = base.format(state.nowDate[0]);
  state.params.createEndDateTime = base.format(state.nowDate[1]);

  const query = base.URLSearchParams(state.params);
  const url = `/api/inbound/search?${query}`;
  httpOperations
    .get(url)
    .then((response: any) => {
      page.container.isLoading = false;
      if (response.successful) {
        base.handleResponse(response.message);
        master.records = response.message.content;
        // 處理分頁
        state.pageable = response.message;
      }
    })
    .catch((e) => {
      page.container.isLoading = false;
    });
};

const onClear = () => {
  //  deep clone
  Object.assign(state.params, resetParams());
  state.nowDate = [base.addDay(-30), base.addDay(0)];
};
const onConfirm = (pairs: any) => {
  base.pairToParams(state.params, pairs);
  onLoad();
};
//#endregion
</script>

<template>
  <el-container
    v-loading="page.container.isLoading"
    :element-loading-text="page.container.message"
  >
    <el-main>
      <!-- 搜尋條件-->
      <el-form label-width="100px" :model="state.params" :inline="false">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item :label="$t('建立日期')">
              <el-date-picker
                v-model="state.nowDate"
                type="daterange"
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="結束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <el-form-item label="單據編號">
              <el-input v-model="state.params.sysOrderNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item>
              <el-button type="primary" mb-2 @click="onLoad()">
                查詢
              </el-button>
              <el-button mb-2 @click="onClear()"> 清除 </el-button>
              <!-- 進階查詢 -->
              <AdvancedSearch
                :fields="state.fields"
                @on-confirm="onConfirm($event)"
              ></AdvancedSearch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 主檔-->
      <DataTable
        :records="master.records"
        :columns="master.columns"
        :custom="master.custom"
        :selection="master.selection"
        :pageable="state.pageable"
        :is-actions="true"
      >
      </DataTable>
    </el-main>
  </el-container>
</template>
