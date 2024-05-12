<template>
  <div class="common-form">
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      :model="modelValue"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        :label="field.label"
        :prop="field.prop"
        v-for="(field, index) in fields"
        :key="`${field.prop}_${index}`"
      >
        <el-select
          filterable
          :multiple="field.multiple"
          :allow-create="field.allowCreate"
          v-if="field.type === FIELD_TYPE.SELECT"
          v-model="modelValue[field.prop]"
          :placeholder="`请选择${field.label}`"
          @change="handleSelectChange($event, field)"
        >
          <el-option
            v-for="item in field.options || []"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-else-if="field.type === FIELD_TYPE.TEXTAREA"
          v-model="modelValue[field.prop]"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
          :placeholder="`请输入${field.label}`"
        ></el-input>
        <el-date-picker
          v-else-if="field.type === FIELD_TYPE.DATETIME"
          v-model="modelValue[field.prop]"
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="new Date(2000, 1, 1, 0, 0, 0)"
        />
        <el-date-picker
          v-else-if="field.type === FIELD_TYPE.DATETIME_RANGE"
          v-model="modelValue[field.prop]"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          :default-time="[
            new Date(2000, 1, 1, 0, 0, 0),
            new Date(2000, 1, 1, 23, 59, 59),
          ]"
        />
        <el-input
          v-else
          v-model="modelValue[field.prop]"
          :placeholder="`请输入${field.label}`"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ submitLabel }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormInstance } from 'element-plus';

const FIELD_TYPE = {
  INPUT: 'input',
  SELECT: 'select',
  DATETIME: 'datetime',
  DATETIME_RANGE: 'datetimerange',
  TEXTAREA: 'textarea',
};

const props = defineProps({
  submitLabel: {
    type: String,
    default: 'Submit',
  },
  labelPosition: {
    type: String,
    default: 'right',
  },
  modelValue: {
    type: Object,
    required: true,
  },
  fields: {
    type: Array,
    default: () => {
      return [
        {
          label: '输入框',
          prop: 'input',
          type: 'input',
          required: true,
        },
        {
          label: '下拉选择',
          prop: 'select',
          propLabel: 'selectLabel',
          type: 'select',
          multiple: false,
          allowCreate: true,
          options: [
            {
              label: '选项1',
              value: 'value1',
            },
            {
              label: '选项2',
              value: 'value2',
            },
          ],
        },
        {
          label: '时间选择',
          prop: 'datetime',
          type: 'datetime',
        },
        {
          label: '时间选择',
          prop: 'datetimeRange',
          type: 'datetimerange',
        },
        {
          label: '输入文本框',
          prop: 'textarea',
          type: 'textarea',
          required: true,
        },
      ];
    },
  },
});

const rules: any = computed(() => {
  return props.fields
    .filter((f: any) => f.required)
    .reduce((pre: any, cur: any) => {
      pre[cur.prop] = [
        {
          required: true,
          message: `${cur.label}不能为空！`,
          trigger: 'blur',
        },
      ];
      if (cur.validator) {
        pre[cur.prop].push({ validator: cur.validator, trigger: 'blur' });
      }
      return pre;
    }, {});
});

const selectOptionsMap: any = props.fields
  .filter((v: any) => v.type === FIELD_TYPE.SELECT)
  .reduce((pre: any, cur: any) => {
    pre[cur.prop] = (cur.options || []).reduce((pre: any, opt: any) => {
      pre[opt.value] = opt.label;
      return pre;
    }, {});
    return pre;
  }, {});
const handleSelectChange = (v: any, field: any) => {
  console.info(`${field.prop} has change, value is : ${v}`);
  if (field.propLabel) {
    props.modelValue[field.propLabel] = selectOptionsMap[field.prop][v];
    console.info(
      `has set ${field.propLabel} value is : ${
        props.modelValue[field.propLabel]
      }`
    );
  }
  field.change && field.change(v);
};

const emits = defineEmits(['submit']);
const ruleFormRef = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean, fields: any) => {
    if (valid) {
      emits('submit', props.modelValue);

      console.log('validate success, value is :', props.modelValue);
    } else {
      console.log('error submit!', fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="less"></style>
