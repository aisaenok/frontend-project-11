const UPDATE_INTERVAL = 5000

const createFeedUpdater = ({ state, fetchRss, parseRss, makeId }) => {
  let timeoutId = null
  let started = false

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

  const scheduleNext = () => {
    timeoutId = setTimeout(run, UPDATE_INTERVAL)
  }

  const run = () => {
    updateFeeds().finally(scheduleNext)
  }

  return {
    start: () => {
      if (started) {
        return
      }

      started = true
      scheduleNext()
    },
    stop: () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      started = false
    },
  }
}

export default createFeedUpdater
