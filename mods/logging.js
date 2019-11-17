let shouldLog = false;
let logger = (content, content2, content3) => {
    if (shouldLog == true) {
        console.log(content, content2 != undefined ? content2: "", content3 != undefined ? content3: "");
    }
}

exports.Logger = logger;