import { proxy } from 'valtio/vanilla'

const state = proxy({
  form: {
    status: 'filling', // filling | sending | failed | success
    error: null, // например 'errors.invalidUrl'
  },
  feeds: [],
})

export default state
