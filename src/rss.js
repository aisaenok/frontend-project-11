const makeRssParseError = () => {
  const error = new Error('Invalid RSS')
  error.code = 'invalidRss'
  return error
}

const getTextContent = (element, selector) => {
  const node = element.querySelector(selector)
  return node ? node.textContent.trim() : ''
}

const parseRss = (xmlString) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'application/xml')

  if (doc.querySelector('parsererror')) {
    throw makeRssParseError()
  }

  const channel = doc.querySelector('channel')

  if (!channel) {
    throw makeRssParseError()
  }

  const feed = {
    title: getTextContent(channel, 'title'),
    description: getTextContent(channel, 'description'),
  }

  const posts = [...channel.querySelectorAll('item')].map(item => ({
    title: getTextContent(item, 'title'),
    description: getTextContent(item, 'description'),
    link: getTextContent(item, 'link'),
  }))

  return { feed, posts }
}

export default parseRss
