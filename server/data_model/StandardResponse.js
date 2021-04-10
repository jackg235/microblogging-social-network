function responseOkay(data, token) {
    return {
        data: data,
        token: token,
        err: null
    }
}

function responseError(data, token, error) {
    return {
        data: data,
        token: token,
        err: error
    }
}

module.exports = {responseOkay, responseError}