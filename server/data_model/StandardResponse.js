function responseOkay(data) {
    return {
        data: data,
        err: null
    }
}

function responseError(data, error) {
    return {
        data: data,
        err: error
    }
}

module.exports = {responseOkay, responseError}