import { remote } from 'electron'
const dialog = remote.dialog

/**
 * async
 * 
 * @param {Object} options
 * 
 * @return {Array} filenames
 */
export function openFileDialog(options) {
    
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog(options, (filenames) => {
            if (!filenames) { reject('must select file') }

            resolve(filenames)
        })
    })
}

export function saveFileDialog(defaultPath = './ss.png') {
    return new Promise((resolve, reject) => {
        dialog.showSaveDialog({ defaultPath },filename => {
            if (!filename) { 
                reject('must select file')
                return
            }

            resolve(filename)
        })
    })
}     