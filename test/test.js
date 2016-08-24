Promise.all([Promise.resolve(123), Promise.resolve(456)]).then((args) => {
    console.log(args.length);
})