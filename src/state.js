import { proxy } from 'valtio/vanilla'

const createState = () => proxy({
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

export default createState
