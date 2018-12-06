const path = require('path')
const marked = require("marked");

module.exports = function (content, map, meta) {
  const reg = /^(#+)( *)(.+)/mg

  let replaced = content
  let match
  let indexing = ''
  while (match = reg.exec(content)) {
    const [r, n, , s] = match
    const { index } = match
    indexing += `${toSpace(n)}- [${s}](#anchor-${index})\n`
    replaced = replaced.replace(r, `${n} <a id="anchor-${index}"></a>${s}`)
  }

  const base = path.basename(this.resourcePath, '.md')
  this.emitFile(`${base}.with-index.html`, marked(indexing))

  return replaced
}

function toSpace(h) {
  let s = ''
  for (let n = h.length - 1; n--;) {
    s += '  '
  }
  return s
}
