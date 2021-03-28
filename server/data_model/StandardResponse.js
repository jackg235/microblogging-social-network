class StandardResponse {
    constructor(data, err) {
        this.data = data;
        this.err = err;
    }

    okay = function(data) {
        return new StandardResponse(data, null)
    }

    err = function(data, err) {
        return new StandardResponse(data, err)
    }

    err = function(err) {
        return new StandardResponse(null, err)
    }
}