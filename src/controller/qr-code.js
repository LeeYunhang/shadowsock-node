import qr from 'node-zxing'

const qrdecoder = qr({})

export function parseQrCode(filename) { 
    return new Promise((resolve, reject) => {
        qrdecoder.decode(filename, (err ,result) => {
            if (err) { reject(err) }
            resolve(result)
            console.log(result);
        })
    })
}