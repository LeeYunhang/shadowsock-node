let a = {
    then() {

    }
}

Promise.resolve(1).then(arg => a).then(arg => console.log(arg))