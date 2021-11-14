<template>
  <div
    class="input-box"
    v-click-outside="close"
  >
    <div class="input-wrapper">
      <span class="input-title">{{ title }}</span>
      <input
        class="input"
        :class="{ 'form-group--error':  propsValidate && submitStatus === 'ERROR'}"
        type="text"
        @input="inputHandler($event.target.value)"
        @focus="open"
        :value="isSelect"
        @keydown.enter.prevent="onClickEnter"
      >
      <icon-drop-down
        :isOpen="isOpen"
        @click="open"
      />
      <span
        v-show="propsValidate && submitStatus === 'ERROR'"
        class="message-error"
      >{{ errorMessage }}</span>
    </div>
    <div
      class="dropdown"
      v-if="isOpen"
    >
      <ul
        class="dropdown__list"
        v-if="dataDropdownFiltered.length"
      >
        <li
          class="dropdown__item"
          v-for="item in dataDropdownFiltered"
          :key="item[propId]"
          @click="selectHandler(item)"
        >
          {{ item[propName] }}
        </li>
      </ul>
      <div v-else>
        Ничего не найдено
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import IconDropDown from "../Icons/IconDropDown.vue";
import { debounce } from "../../helpers/debounce.js";

export default {
  name: "InputSelection",

  directives: {
    ClickOutside,
  },

  components: {
    IconDropDown,
  },

  props: {
    title: {
      type: String,
      default: "",
    },

    dataDropdown: {
      type: Array,
      default: () => [],
    },

    propName: {
      type: String,
      default: "name",
    },

    propId: {
      type: String,
      default: "",
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

  data() {
    return {
      isOpen: false,
      dataDropdownFiltered: [],
      serchText: "",
      debounceSerchText: null,
      isSelect: "",
    };
  },

  created() {
    this.debounceSerchText = debounce(this.getDataItem, 500);
    this.dataDropdownFiltered = this.dataDropdown;
  },

  methods: {
    inputHandler(value) {
      this.serchText = value;
    },

    selectHandler(item) {
      this.isSelect = item[this.propName];
      this.$emit("selected", item);
      this.close();
    },

    onClickEnter() {
      const element = this.dataDropdownFiltered.find((item) => {
        return (
          item[this.propName].toLowerCase() === this.serchText.toLowerCase()
        );
      });

      if (element) {
        this.isSelect = element[this.propName];
        this.$emit("selected", element);
        this.close();
      }
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    getDataItem(serchWord) {
      console.log("FETCH DATA-ITEM: GET DATA-ITEM FROM API", serchWord);
      this.dataDropdownFiltered = this.dataDropdown.filter((item) => {
        return item[this.propName]
          .toLowerCase()
          .includes(serchWord.toLowerCase());
      });

      this.isSelect = serchWord;
    },
  },

  watch: {
    serchText(newValue) {
      this.debounceSerchText(newValue);
    },
  },
};
</script>

<style scoped>
.input-box {
  position: relative;
}

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

.dropdown {
  position: absolute;
  z-index: 1;
  width: 100%;
  max-height: 180px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 10px 20px rgb(205 205 205 / 30%);
  overflow-y: auto;
}

.dropdown__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown__item {
  padding: 5px 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  cursor: pointer;
}

.dropdown__item:hover {
  color: #46a358;
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