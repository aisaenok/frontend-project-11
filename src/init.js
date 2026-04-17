import state from './state.js'
import validateUrl from './validate.js'
import initView from './view.js'

const getElements = () => ({
  form: document.querySelector('.rss-form'),
  title: document.querySelector('.page-title'),
  subtitle: document.querySelector('.page-subtitle'),
  label: document.querySelector('label[for="url-input"]'),
  input: document.querySelector('#url-input'),
  submit: document.querySelector('button[type="submit"]'),
  example: document.querySelector('.form-text'),
  feedback: document.querySelector('.feedback'),
})

const handleSuccess = (elements, url) => {
  state.feeds.push({ url })
  state.form.status = 'success'
  state.form.error = null

  elements.form.reset()
  elements.input.focus()
}

const handleError = (error) => {
  state.form.status = 'failed'
  state.form.error = error.message
}

const handleSubmit = elements => (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const url = formData.get('url').trim()
  const existingUrls = state.feeds.map(({ url: feedUrl }) => feedUrl)

  state.form.status = 'sending'
  state.form.error = null

  validateUrl(url, existingUrls)
    .then(() => handleSuccess(elements, url))
    .catch(handleError)
    .finally(() => {
      if (state.form.status === 'sending') {
        state.form.status = 'filling'
      }
    })
}

const init = () => {
  const elements = getElements()

  initView(state, elements)
  elements.form.addEventListener('submit', handleSubmit(elements))
}

export default init
