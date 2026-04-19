import { subscribe } from 'valtio/vanilla'

const createCard = (title, bodyHtml) => `
  <div class="card border-0">
    <div class="card-body">
      <h2 class="card-title h4">${title}</h2>
    </div>
    <ul class="list-group border-0 rounded-0">
      ${bodyHtml}
    </ul>
  </div>
`

const renderStaticTexts = (elements, i18n) => {
  elements.title.textContent = i18n.t('ui.title')
  elements.subtitle.textContent = i18n.t('ui.subtitle')
  elements.label.textContent = i18n.t('ui.label')
  elements.input.placeholder = i18n.t('ui.placeholder')
  elements.input.setAttribute('aria-label', i18n.t('ui.label'))
  elements.submit.textContent = i18n.t('ui.submit')
  elements.example.textContent = i18n.t('ui.example')
  elements.modal.querySelector('.btn-secondary').textContent = i18n.t('ui.close')
  elements.modalReadFull.textContent = i18n.t('ui.readFull')
  elements.modalCloseButton.setAttribute('aria-label', i18n.t('ui.close'))
}

const renderForm = (state, elements, i18n) => {
  const { form } = state

  elements.input.classList.remove('is-invalid', 'is-valid')
  elements.feedback.classList.remove('text-danger', 'text-success')
  elements.feedback.textContent = ''

  if (form.status === 'failed') {
    elements.input.classList.add('is-invalid')
    elements.feedback.classList.add('text-danger')
    elements.feedback.textContent = i18n.t(form.error)
  }

  if (form.status === 'success') {
    elements.input.classList.add('is-valid')
    elements.feedback.classList.add('text-success')
    elements.feedback.textContent = i18n.t('ui.success')
  }

  if (state.form.status === 'sending') {
    elements.submit.setAttribute('disabled', 'disabled')
    elements.input.setAttribute('disabled', 'disabled')
  }
  else {
    elements.submit.removeAttribute('disabled')
    elements.input.removeAttribute('disabled')
  }
}

const renderFeeds = (state, elements, i18n) => {
  const { feeds } = state

  if (feeds.length === 0) {
    elements.feeds.innerHTML = ''
    return
  }

  const items = feeds.map(feed => `
    <li class="list-group-item border-0 border-end-0">
      <h3 class="h6 m-0">${feed.title}</h3>
      <p class="m-0 small text-black-50">${feed.description}</p>
    </li>
  `).join('')

  elements.feeds.innerHTML = createCard(i18n.t('ui.feeds'), items)
}

const renderPosts = (state, elements, i18n) => {
  if (state.posts.length === 0) {
    elements.posts.innerHTML = ''
    return
  }

  const viewedPosts = new Set(state.ui.viewedPostIds)

  const items = state.posts.map((post) => {
    const isViewed = viewedPosts.has(post.id)
    const linkClass = isViewed ? 'fw-normal link-secondary' : 'fw-bold'

    return `
      <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
        <a
          href="${post.link}"
          target="_blank"
          rel="noopener noreferrer"
          class="${linkClass}"
          data-id="${post.id}"
        >
          ${post.title}
        </a>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          data-id="${post.id}"
          data-role="preview"
          data-bs-toggle="modal"
          data-bs-target="#postModal"
        >
          ${i18n.t('ui.preview')}
        </button>
      </li>
    `
  }).join('')

  elements.posts.innerHTML = createCard(i18n.t('ui.posts'), items)
}

const renderModal = (state, elements) => {
  const { modalPostId } = state.ui

  if (!modalPostId) {
    return
  }

  const post = state.posts.find(item => item.id === modalPostId)

  if (!post) {
    return
  }

  elements.modalTitle.textContent = post.title
  elements.modalDescription.textContent = post.description
  elements.modalReadFull.href = post.link
}

const render = (state, elements, i18n) => {
  renderStaticTexts(elements, i18n)
  renderForm(state, elements, i18n)
  renderFeeds(state, elements, i18n)
  renderPosts(state, elements, i18n)
  renderModal(state, elements)
}

const initView = (state, elements, i18n) => {
  render(state, elements, i18n)

  subscribe(state, () => {
    render(state, elements, i18n)
  })
}

export default initView
