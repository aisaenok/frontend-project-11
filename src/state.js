import { proxy } from 'valtio/vanilla'

const state = proxy({
  form: {
    status: 'filling',
    error: null,
  },
  feeds: [],
  posts: [],
  ui: {
    modalPostId: null,
    viewedPostIds: [],
  },
})

export default state
