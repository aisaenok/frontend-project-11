import i18next from 'i18next'
import { subscribe } from 'valtio/vanilla'

const renderStaticTexts = (elements) => {
  elements.title.textContent = i18next.t('ui.title')
  elements.subtitle.textContent = i18next.t('ui.subtitle')
  elements.label.textContent = i18next.t('ui.label')
  elements.input.placeholder = i18next.t('ui.placeholder')
  elements.input.setAttribute('aria-label', i18next.t('ui.label'))
  elements.submit.textContent = i18next.t('ui.submit')
  elements.example.textContent = i18next.t('ui.example')
}

const renderFormState = (state, elements) => {
  const { form } = state

  elements.input.classList.remove('is-invalid', 'is-valid')
  elements.feedback.classList.remove('text-danger', 'text-success')
  elements.feedback.textContent = ''

  if (form.status === 'failed') {
    elements.input.classList.add('is-invalid')
    elements.feedback.classList.add('text-danger')
    elements.feedback.textContent = i18next.t(form.error)
  }

  if (form.status === 'success') {
    elements.input.classList.add('is-valid')
    elements.feedback.classList.add('text-success')
    elements.feedback.textContent = i18next.t('ui.success')
  }

  if (form.status === 'sending') {
    elements.submit.setAttribute('disabled', 'disabled')
  }
  else {
    elements.submit.removeAttribute('disabled')
  }
}

const initView = (state, elements) => {
  renderStaticTexts(elements)
  renderFormState(state, elements)

  subscribe(state, () => {
    renderFormState(state, elements)
  })
}

export default initView
