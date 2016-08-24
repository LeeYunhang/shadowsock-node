// import qr from 'node-zxing'
import qr from 'qr-image'

// const qrdecoder = qr({})

export function parseQrCode(filename) { 
    return new Promise((resolve, reject) => {
        qrdecoder.decode(filename, (err ,result) => {
            if (err) { reject(err) }
            resolve(result)
            console.log(result);
        })
    })
}

export function generateQrCode(text) {
    return qr.image(text, { type: 'png' })
}