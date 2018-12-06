const path = require('path')
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const loaderUtils = require('loader-utils')

module.exports = function (content, map, meta) {
  return content
}

module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  const { blockingList } = loaderUtils.getOptions(this)

  return blockingList.includes(path.basename(this.resourcePath))
    ? readFile(this.resourcePath)
    : undefined
}
