import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'errors.required',
    notOneOf: 'errors.duplicate',
  },
  string: {
    url: 'errors.invalidUrl',
  },
})

const buildSchema = existingUrls => yup.string()
  .required()
  .url()
  .notOneOf(existingUrls)

const validateUrl = (url, existingUrls) => buildSchema(existingUrls).validate(url)

export default validateUrl
