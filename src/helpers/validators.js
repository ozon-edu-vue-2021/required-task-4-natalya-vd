import { helpers } from 'vuelidate/lib/validators'

export const wordLatine = helpers.regex('alpha', /^[a-zA-Z]*$/)

export const wordRussian = helpers.regex('alpha', /^[а-яА-Я]*$/)

export const seriesPassportRussia = (number) => !helpers.req(number) || number.length === 4

export const numberPassportRussia = (number) => !helpers.req(number) || number.length === 6

export const birthdate = (value) => {
    const date = new Date();
    const dateTooday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return value <= dateTooday;
}