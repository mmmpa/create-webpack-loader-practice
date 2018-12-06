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

module.exports = async function (content, map, meta) {
  const { deniedList } = loaderUtils.getOptions(this)

  const list = await readFile(deniedList)
  const result = censor(content, JSON.parse(list))

  return `module.exports = ${JSON.stringify(result)}`
}
