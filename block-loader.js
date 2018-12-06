const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = function (content, map, meta) {
  return this.data.censored
    ? `module.exports = ${JSON.stringify(content)}`
    : content
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  const { blockingList, blocked } = loaderUtils.getOptions(this)

  if(blocked) {
    data.censored = true
    return
  }

  if (blockingList.includes(path.basename(this.resourcePath))) {
    const re = `-!${__filename}?blocked=true!${this.resourcePath}`
    return `module.exports = require('${re}');`
  }
}
