const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)
const loaderUtils = require('loader-utils')

function censor(content, list) {
  return Object.keys(list).reduce(
    (a, k) => a.replace(new RegExp(`\\b${k}\\b`, 'gm'), list[k]),
    content,
  )
}

module.exports = function (content, map, meta) {
  const callback = this.async()
  const { deniedList } = loaderUtils.getOptions(this)

  readFile(deniedList).then(s => {
    const result = censor(content, JSON.parse(s))

    callback(null, `module.exports = ${JSON.stringify(result)}`)
  })
}
