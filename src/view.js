import { subscribe } from 'valtio/vanilla'

const renderForm = (state, elements) => {
  const { input, submit, feedback } = elements
  const { form } = state

  input.classList.remove('is-invalid')
  input.classList.remove('is-valid')
  feedback.classList.remove('text-danger')
  feedback.classList.remove('text-success')

  if (form.status === 'failed') {
    input.classList.add('is-invalid')
    feedback.classList.add('text-danger')
    feedback.textContent = form.error
  }

  if (form.status === 'success') {
    input.classList.add('is-valid')
    feedback.classList.add('text-success')
    feedback.textContent = 'RSS успешно загружен'
  }

  if (form.status === 'sending') {
    submit.setAttribute('disabled', 'disabled')
  }
  else {
    submit.removeAttribute('disabled')
  }
}

const initView = (state, elements) => {
  renderForm(state, elements)

  subscribe(state, () => {
    renderForm(state, elements)
  })
}

export default initView
