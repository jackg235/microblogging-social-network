function responseOkay(data, token) {
    return {
        data: data,
        token: token,
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