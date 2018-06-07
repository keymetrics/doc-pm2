const fs = require('fs')

// const { exec } = require('child_process')
// const pm2Help = exec('pm2', ['-h'])

// let stream = fs.createWriteStream('./pm2Help')

// pm2Help.stdout.on('data', (data) => {
//   stream.write(data)
//   console.log(data)
// })

// pm2Help.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`)
// })

// pm2Help.on('close', (code) => {
//   console.log(`child process exited with code ${code}`)
//   stream.end()
// })

const escapeSpecialChar = (str) => {
  if (typeof str !== typeof '') { return str }
  return str.replace(/\|/g, '&#124;')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
}

const schema = fs.readFileSync('./pm2Help').toString()
// console.log(schema)
const tab = schema.split('\n')
stream = fs.createWriteStream('./cli.md')

stream.write('# CLI reference')
stream.write('\n\n### pm2 Flags\n\n')
stream.write('Flag name|Description\n')
stream.write('---|---\n')

let i = 0;
while (!tab[i].match(/Options/)) {
  i++
}
i = i + 2
while (tab[i].length) {
  const flag = tab[i].split(/ {2,}/).filter((entry) => { return entry.trim() != '' })
  const flagName = escapeSpecialChar(flag[0])
  const flagDescription = escapeSpecialChar(flag[1])
  stream.write(`${flagName}|${flagDescription}\n`)
  i++
}
while (!tab[i].match(/Commands/)) {
  i++
}
i = i + 2

stream.write('\n\n### pm2 Commands\n\n')
stream.write('Command name|Description\n')
stream.write('---|---\n')
while (i < tab.length) {
  // console.log(tab[i])
  const flag = tab[i].split(/ {2,}/).filter((entry) => { return entry.trim() != '' })
  const flagName = escapeSpecialChar(flag[0])
  const flagDescription = escapeSpecialChar(flag[1])
  stream.write(`${flagName}|${flagDescription}\n`)
  i++
}

stream.end()