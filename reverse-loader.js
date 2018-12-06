module.exports = function (raw, map, meta) {
  const content = normalize(raw)
  let result = ''
  for (let i = content.length; i; result += content[--i]) {}
  return `module.exports = ${JSON.stringify(result)}`
}

function normalize(content) {
  try {
    return eval(content) || content
  } catch(e) {
    return content
  }
}
