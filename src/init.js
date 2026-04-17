import i18next from 'i18next'
import state from './state.js'
import validateUrl from './validate.js'
import initView from './view.js'
import fetchRss from './api.js'
import parseRss from './rss.js'
import { makeId } from './utils.js'

const getElements = () => ({
  form: document.querySelector('.rss-form'),
  title: document.querySelector('.page-title'),
  subtitle: document.querySelector('.page-subtitle'),
  label: document.querySelector('label[for="url-input"]'),
  input: document.querySelector('#url-input'),
  submit: document.querySelector('button[type="submit"]'),
  example: document.querySelector('.form-text'),
  feedback: document.querySelector('.feedback'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
})

const addFeedData = (url, parsed) => {
  const feedId = makeId()

  state.feeds.unshift({
    id: feedId,
    url,
    title: parsed.feed.title,
    description: parsed.feed.description,
  })

  const posts = parsed.posts.map(post => ({
    id: makeId(),
    feedId,
    title: post.title,
    link: post.link,
    description: post.description,
  }))

  state.posts.unshift(...posts)
}

const normalizeError = (error) => {
  if (error.name === 'ValidationError') {
    return error.message
  }

  if (error.message === 'errors.invalidRss') {
    return 'errors.invalidRss'
  }

  if (error.isAxiosError) {
    return 'errors.network'
  }

  return 'errors.unknown'
}

const handleSuccess = (elements, url, parsed) => {
  addFeedData(url, parsed)

  state.form.status = 'success'
  state.form.error = null

  elements.form.reset()
  elements.input.focus()
}

const handleError = (error) => {
  state.form.status = 'failed'
  state.form.error = normalizeError(error)
}

const handleSubmit = elements => (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const url = formData.get('url').trim()
  const existingUrls = state.feeds.map(feed => feed.url)

  state.form.status = 'sending'
  state.form.error = null

  validateUrl(url, existingUrls)
    .then(() => fetchRss(url))
    .then(xml => parseRss(xml))
    .then(parsed => handleSuccess(elements, url, parsed))
    .catch(handleError)
    .finally(() => {
      if (state.form.status === 'sending') {
        state.form.status = 'filling'
      }
    })
}

const init = () => {
  const elements = getElements()

  initView(state, elements, i18next)
  elements.form.addEventListener('submit', handleSubmit(elements))
}

export default init
