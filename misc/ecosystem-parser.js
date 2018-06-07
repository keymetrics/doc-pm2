const axios = require('axios')
const fs = require('fs')

// const schema = axios.get('https://raw.githubusercontent.com/Unitech/pm2/master/lib/API/schema.json')
//   .then(res => { return res.data })
const schema = JSON.parse(fs.readFileSync('./schema.json'))

const escapeVerticalBar = (str) => {
  if (typeof str !== typeof '') { return str }
  return str.replace(/\|/g, '&#124;')
}

const stream = fs.createWriteStream('./ecosystem.md')

stream.write('# Ecosystem file reference\n\n')
stream.write('Entry name|Description|Type|Default\n')
stream.write('---|---|---|---\n')

for (let key of Object.keys(schema)) {
  const description = escapeVerticalBar(schema[key].description)
  const type = escapeVerticalBar(schema[key].type)
  const defaultValue = escapeVerticalBar(schema[key].default)
  
  stream.write(`${key}|${description || ''}|${type || ''}|${defaultValue || ''}\n`)
}
stream.end()
