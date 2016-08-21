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