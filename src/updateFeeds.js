import state from './state.js'
import fetchRss from './api.js'
import parseRss from './rss.js'
import { makeId } from './utils.js'

const UPDATE_INTERVAL = 5000

const getNewPosts = (feedId, parsedPosts) => {
  const existingLinks = new Set(
    state.posts
      .filter(post => post.feedId === feedId)
      .map(post => post.link),
  )

  return parsedPosts.filter(post => !existingLinks.has(post.link))
}

const loadFeedPosts = feed => fetchRss(feed.url)
  .then(xml => parseRss(xml))
  .then((parsed) => {
    const newPosts = getNewPosts(feed.id, parsed.posts)
      .map(post => ({
        id: makeId(),
        feedId: feed.id,
        title: post.title,
        link: post.link,
        description: post.description,
      }))

    if (newPosts.length > 0) {
      state.posts.unshift(...newPosts)
    }
  })

const updateFeeds = () => {
  const promises = state.feeds.map(feed => loadFeedPosts(feed))

  return Promise.allSettled(promises)
}

const runUpdates = () => {
  updateFeeds()
    .finally(() => {
      setTimeout(runUpdates, UPDATE_INTERVAL)
    })
}

export default runUpdates
