<template>
  <div class="input-wrapper">
    <span class="input-title">{{ title }}</span>
    <input
      class="input"
      :type="propsType"
      @input="inputHandler($event.target.value)"
      :class="{ 'form-group--error':  propsValidate && submitStatus === 'ERROR'}"
    >
    <span
      v-if="propsValidate && submitStatus === 'ERROR'"
      class="message-error"
    >{{ errorMessage }}</span>
  </div>
</template>
<script>
export default {
  name: "InputText",

  props: {
    title: {
      type: String,
      default: "",
    },

    propsType: {
      type: String,
      default: "text",
    },

    propsValidate: {
      type: Boolean,
      default: false,
    },

    submitStatus: {
      type: String,
      default: "PENDING",
    },

    errorMessage: {
      type: String,
      default: "Неверные данные",
    },
  },

  methods: {
    inputHandler(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.input-title {
  margin: 0 0 10px;
  font-size: 15px;
  line-height: 15px;
  color: #3d3d3d;
}

.input {
  width: 100%;
  height: 40px;
  padding: 12px 14px;
  font-size: 14px;
  color: #3d3d3d;
  line-height: 16px;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 3px;
  outline: 0;
}

.input:focus,
.input:hover {
  border: 1px solid #46a358;
}

.form-group--error {
  border: 1px solid red;
}

.message-error {
  color: red;
  font-size: 13px;
  line-height: 14px;
  position: absolute;
  bottom: -16px;
}
</style>