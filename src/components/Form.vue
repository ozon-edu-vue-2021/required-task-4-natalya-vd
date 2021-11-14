<template>
  <form
    class="form"
    autocomplete="off"
    @submit.prevent="formSubmit"
  >
    <div>
      <div class="form__wrapper">
        <p class="form__header">
          Личные данные
        </p>

        <div class="form__colums form__colums_3">
          <input-text
            v-model="formData.surname"
            title="Фамилия"
            propsType="text"
            :propsValidate="$v.formData.surname.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.surname"
          />
          <input-text
            v-model="formData.name"
            title="Имя"
            propsType="text"
            :propsValidate="$v.formData.name.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.name"
          />
          <input-text
            v-model="formData.patronymic"
            title="Отчество"
            propsType="text"
            :propsValidate="$v.formData.patronymic.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.patronymic"
          />
        </div>
        <div class="form__colums form__colums_2">
          <input-text
            v-model="formData.birthdate"
            title="Дата рождения"
            propsType="date"
            :propsValidate="$v.formData.birthdate.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.birthdate"
          />
          <input-text
            v-model="formData.email"
            title="E-mail"
            propsType="email"
            :propsValidate="$v.formData.email.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.email"
          />
        </div>

        <div>
          <p>
            Пол
          </p>
          <input
            type="radio"
            id="male"
            value="male"
            v-model="formData.gender"
          >
          <label for="male">
            Мужской
          </label>
          <input
            type="radio"
            id="female"
            value="female"
            v-model="formData.gender"
          >
          <label for="female">
            Женский
          </label>
        </div>
      </div>
      <div class="form__wrapper">
        <p class="form__header">
          Паспортные данные
        </p>
        <div class="form-nationality">
          <input-selection
            title="Гражданство"
            :dataDropdown="citizenships"
            prop-name="nationality"
            prop-id="id"
            @selected="updateSelectedNationality"
            :propsValidate="$v.formData.nationality.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.nationality"
          />
        </div>
        <div
          class="form__colums form__colums_3"
          v-show="formData.nationality && formData.nationality.id === 8604"
        >
          <input-text
            v-model="formData.seriesPassport"
            title="Серия паспорта"
            propsType="text"
            :propsValidate="$v.formData.seriesPassport.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.seriesPassport"
          />
          <input-text
            v-model="formData.numberPassport"
            title="Номер паспорта"
            propsType="text"
            :propsValidate="$v.formData.numberPassport.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.numberPassport"
          />

          <input-text
            v-model="formData.issueDate"
            title="Дата выдачи"
            propsType="date"
          />
        </div>
        <div v-show="formData.nationality && formData.nationality.id !== 8604">
          <div>
            <div class="form__colums form__colums_2">
              <input-text
                v-model="formData.surnameLatin"
                title="Фамилия на латинице"
                propsType="text"
                :propsValidate="$v.formData.surnameLatin.$invalid"
                :submitStatus="submitStatus"
                :errorMessage="errorMessage.surnameLatin"
              />
              <input-text
                v-model="formData.nameLatin"
                title="Имя на латинице"
                propsType="text"
                :propsValidate="$v.formData.nameLatin.$invalid"
                :submitStatus="submitStatus"
                :errorMessage="errorMessage.nameLatin"
              />
            </div>
            <p>
              Иностранцы заполняют латинскими буквами. Например, Ivanov Ivan
            </p>
          </div>
          <div class="form__colums form__colums_3">
            <input-text
              v-model="formData.numberPassportForeigner"
              title="Номер паспорта"
              propsType="text"
              :propsValidate="$v.formData.numberPassportForeigner.$invalid"
              :submitStatus="submitStatus"
              :errorMessage="errorMessage.numberPassportForeigner"
            />
            <input-selection
              title="Страна выдачи"
              :dataDropdown="citizenships"
              prop-name="nationality"
              prop-id="id"
              @selected="updateSelectedIssueState"
            />
            <input-selection
              title="Тип паспорта"
              :dataDropdown="passportType"
              prop-name="type"
              prop-id="id"
              @selected="updateSelectedTypePassport"
            />
          </div>
        </div>
        <div>
          <p>
            Меняли ли фамилию или имя
          </p>
          <input
            type="radio"
            id="no"
            value="false"
            v-model="formData.radioAnswer"
            @change="radioHandler($event)"
          >
          <label for="no">
            Нет
          </label>
          <input
            type="radio"
            id="yes"
            value="true"
            v-model="formData.radioAnswer"
            @change="radioHandler($event)"
          >
          <label for="yes">
            Да
          </label>
        </div>
        <div
          v-show="hasAnswer"
          class="form__colums form__colums_2"
        >
          <input-text
            v-model="formData.surnameOld"
            title="Фамилия"
            propsType="text"
            :propsValidate="$v.formData.surnameOld.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.surnameOld"
          />
          <input-text
            v-model="formData.nameOld"
            title="Имя"
            propsType="text"
            :propsValidate="$v.formData.nameOld.$invalid"
            :submitStatus="submitStatus"
            :errorMessage="errorMessage.nameOld"
          />
        </div>
      </div>
    </div>
    <button
      class="button"
      type="submit"
    >
      Отправить
    </button>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, requiredIf, email, numeric } from "vuelidate/lib/validators";
import {
  wordLatine,
  wordRussian,
  seriesPassportRussia,
  numberPassportRussia,
  birthdate,
} from "../helpers/validators.js";
import InputText from "./inputs/InputText.vue";
import InputSelection from "./inputs/inputSelection.vue";
import citizenships from "../assets/data/citizenships.json";
import passportType from "../assets/data/passport-types.json";

const ERROR_MESSAGE = {
  surname: "Фамилия может содержать только русские буквы",
  name: "Имя может содержать только русские буквы",
  patronymic: "Отчетсво может содержать только русские буквы",
  surnameOld: "Фамилия может содержать только русские буквы",
  nameOld: "Имя может содержать только русские буквы",
  birthdate: "Дата рождения не может быть позже текущей даты",
  email: "Неверный адрес",
  nationality: "Поле обязательно для заполнения",
  seriesPassport: "Серия паспорта может содержать только 4 цифры",
  numberPassport: "Номер паспорта может содержать только 6 цифр",
  numberPassportForeigner: "Поле обязательно для заполнения",
  surnameLatin: "Фамилия может содержать только латинские буквы",
  nameLatin: "Имя может содержать только латинские буквы",
};

export default {
  name: "Form",
  components: {
    InputText,
    InputSelection,
  },

  mixins: [validationMixin],

  data() {
    return {
      formData: {
        surname: "",
        name: "",
        patronymic: "",
        birthdate: "",
        email: "",
        gender: "",
        nationality: "",
        seriesPassport: "",
        numberPassport: "",
        issueDate: "",
        issueState: "",
        typePassport: "",
        numberPassportForeigner: "",
        surnameLatin: "",
        nameLatin: "",
        radioAnswer: "",
        surnameOld: "",
        nameOld: "",
      },

      hasAnswer: false,
      citizenships: citizenships,
      passportType: passportType,
      submitStatus: "PENDING",
      errorMessage: ERROR_MESSAGE,
    };
  },

  validations: {
    formData: {
      surname: {
        required,
        wordRussian,
      },
      name: {
        required,
        wordRussian,
      },
      patronymic: {
        required,
        wordRussian,
      },
      surnameOld: {
        required: requiredIf(function () {
          return this.hasAnswer;
        }),
        wordRussian,
      },
      nameOld: {
        required: requiredIf(function () {
          return this.hasAnswer;
        }),
        wordRussian,
      },
      birthdate: {
        required,
        birthdate,
      },
      email: {
        required,
        email,
      },

      nationality: {
        required,
      },
      seriesPassport: {
        required: requiredIf(function () {
          return (
            this.formData.nationality && this.formData.nationality.id === 8604
          );
        }),
        numeric,
        seriesPassportRussia,
      },
      numberPassport: {
        required: requiredIf(function () {
          return (
            this.formData.nationality && this.formData.nationality.id === 8604
          );
        }),
        numeric,
        numberPassportRussia,
      },
      numberPassportForeigner: {
        required: requiredIf(function () {
          return (
            this.formData.nationality && this.formData.nationality.id !== 8604
          );
        }),
      },
      surnameLatin: {
        required: requiredIf(function () {
          return (
            this.formData.nationality && this.formData.nationality.id !== 8604
          );
        }),
        wordLatine,
      },
      nameLatin: {
        required: requiredIf(function () {
          return (
            this.formData.nationality && this.formData.nationality.id !== 8604
          );
        }),
        wordLatine,
      },
    },
  },

  methods: {
    radioHandler(event) {
      if (event.target.id === "yes") {
        this.hasAnswer = true;
      } else {
        this.hasAnswer = false;
        this.formData.surnameOld = "";
        this.formData.nameOld = "";
      }
    },

    updateSelectedNationality(item) {
      this.formData.nationality = item;
    },

    updateSelectedIssueState(item) {
      this.formData.issueState = item;
    },

    updateSelectedTypePassport(item) {
      this.formData.typePassport = item;
    },

    formSubmit(event) {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "OK";
        //console.log(this.formData);
        console.log(JSON.stringify(this.formData));
        event.target.reset();
      }
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  min-height: 860px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 0px 20px rgb(205 205 205 / 30%);
  background: #fff;
}

.form__wrapper {
  margin: 0 0 50px;
}

.form__header {
  margin: 0 0 30px;
  font-weight: 600;
  font-size: 22px;
  line-height: 22px;
  color: #3d3d3d;
}

.form__colums {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 0 20px;
}

.form_colums_3 {
  grid-template-columns: repeat(3, 1fr);
}

.form__colums_2 {
  grid-template-columns: repeat(2, 1fr);
}

.form-nationality {
  width: 40%;
  margin: 0 0 20px;
}

.button {
  align-self: center;
  padding: 12px 50px;
  background: #46a358;
  border-radius: 3px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.button:focus,
.button:hover {
  opacity: 0.85;
}

.button:active {
  transform: scale(0.85);
}

/* .form-group--error {
  border: 1px solid red;
} */
</style>
