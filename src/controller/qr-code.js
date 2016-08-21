import QrCode from 'qrcode-reader'

export function parseQrCode(filename) {
    return new Promise((resolve, reject) => {
        const qr = new QrCode()
        qr.callback = (result, err) => {
            if (err) { 
                reject(err)
                return
            }

            if (result) {
                resolve(result)
            } else {
                reject(err)
            }
        }

        filename = 'file:/' + filename
        qr.decode(filename)
    })
}