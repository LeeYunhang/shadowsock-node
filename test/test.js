import qr from 'qr-image'
import fs from 'fs'

const code = qr.image('hello world', { type: 'png' })
const output = fs.createWriteStream('test.png')

code.pipe(output)