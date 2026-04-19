import createState from './state.js'
import validateUrl from './validate.js'
import initView from './view.js'
import fetchRss from './api.js'
import parseRss from './rss.js'
import createFeedUpdater from './updateFeeds.js'
import { createIdGenerator } from './utils.js'

const getElements = () => ({
  form: document.querySelector('.rss-form'),
  input: document.querySelector('#url-input'),
  submit: document.querySelector('button[type="submit"]'),
  feedback: document.querySelector('.feedback'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  title: document.querySelector('.page-title'),
  subtitle: document.querySelector('.page-subtitle'),
  label: document.querySelector('label[for="url-input"]'),
  example: document.querySelector('.form-text'),
  modal: document.querySelector('#postModal'),
  modalTitle: document.querySelector('.modal-title'),
  modalDescription: document.querySelector('.modal-description'),
  modalReadFull: document.querySelector('.modal-read-full'),
  modalCloseButton: document.querySelector('.btn-close'),
})

const init = (i18n) => {
  const state = createState()
  const makeId = createIdGenerator()
  const elements = getElements()
  const feedUpdater = createFeedUpdater({
    state,
    fetchRss,
    parseRss,
    makeId,
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

  const markPostAsViewed = (postId) => {
    if (!state.ui.viewedPostIds.includes(postId)) {
      state.ui.viewedPostIds.push(postId)
    }
  }

  const normalizeError = (error) => {
    if (error.name === 'ValidationError') {
      return error.message
    }

    if (error.code === 'invalidRss') {
      return 'errors.invalidRss'
    }

    if (error.isAxiosError) {
      return 'errors.network'
    }

    return 'errors.unknown'
  }

  const handleSuccess = (url, parsed) => {
    addFeedData(url, parsed)
    state.form.status = 'success'
    state.form.error = null

    elements.form.reset()
  }

  const handleError = (error) => {
    state.form.status = 'failed'
    state.form.error = normalizeError(error)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const url = formData.get('url').trim()
    const existingUrls = state.feeds.map(feed => feed.url)

    state.form.status = 'sending'
    state.form.error = null

    validateUrl(url, existingUrls)
      .then(() => fetchRss(url))
      .then(xml => parseRss(xml))
      .then(parsed => handleSuccess(url, parsed))
      .catch(handleError)
      .finally(() => {
        if (state.form.status === 'sending') {
          state.form.status = 'filling'
        }

        elements.input.focus()
      })
  }

  const handlePostsClick = (event) => {
    const postId = event.target.dataset.id

    if (!postId) {
      return
    }

    markPostAsViewed(postId)

    if (event.target.matches('[data-role="preview"]')) {
      state.ui.modalPostId = postId
    }
  }

  initView(state, elements, i18n)

  elements.form.addEventListener('submit', handleSubmit)
  elements.posts.addEventListener('click', handlePostsClick)

  feedUpdater.start()

  return () => {
    feedUpdater.stop()
    elements.form.removeEventListener('submit', handleSubmit)
    elements.posts.removeEventListener('click', handlePostsClick)
  }
}

export default init
