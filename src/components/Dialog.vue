<script setup lang="ts">

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: "Dialog" },
  fullscreen: { type: Boolean, default: false },
  maxHeight: { type: String, default: "500px" },
});
// event
const emit = defineEmits(["on-before-close"]);
const dialogRef = reactive({
  success: false,
  close: false,
});
const handleClose = (event: any) => {
  dialogRef.close = false;
  emit("on-before-close", dialogRef);
};
const afterClosed = (val: boolean) => {
  dialogRef.success = val;
  emit("on-before-close", dialogRef);
};
</script>
<template>
  <el-dialog
    :model-value="props.modelValue"
    :title="title"
    :width="500"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="afterClosed(false)"> cancel </el-button>

      <el-button
        style="margin-left: 60px"
        type="primary"
        @click="afterClosed(true)"
      >
        save
      </el-button>
    </span>
  </el-dialog>
</template>
