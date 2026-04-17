import { proxy } from 'valtio/vanilla'

const state = proxy({
  form: {
    status: 'filling', // filling | sending | failed | success
    error: null,
    valid: true,
  },
  feeds: [],
})

export default state
