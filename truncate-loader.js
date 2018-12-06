const loaderUtils = require('loader-utils')

module.exports = function (content, map, meta) {
  const {
    max: raw = 6,
    ellipsis = ' (snip)',
  } = loaderUtils.getOptions(this)

  const max = +raw

  const s = content.length <= max
    ? content
    : (content).slice(0, max - ellipsis.length) + ellipsis

  return `module.exports = ${JSON.stringify(s)}`
}

