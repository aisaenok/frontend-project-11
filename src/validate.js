import * as yup from 'yup'

const buildSchema = existingUrls => yup.string()
  .required('Не должно быть пустым')
  .url('Ссылка должна быть валидным URL')
  .notOneOf(existingUrls, 'RSS уже существует')

const validateUrl = (url, existingUrls) => buildSchema(existingUrls).validate(url)

export default validateUrl
