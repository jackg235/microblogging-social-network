const UserModel = require('../data_model/User')

async function createUser(user) {
    const newUser = new UserModel(user)
    try {
        const data = await newUser.save()
        console.log('The following user has been added to the DB: ')
        console.log(data)
        return null;
    } catch (e) {
        console.log(e)
        return "Error: can't register a new user with provided username and/or email."
    }
}

async function loginUser(email, password) {
    try {
        const response = await UserModel.find({email: email, password: password})
        if (response.length == 0) {
            return {
                data: null,
                err: "Error: can't login with provided credentials"
            };
        }
        return {
            data: response[0],
            err: null
        };
    } catch (e) {
        console.log(e)
        return "Error (unknown)"
    }
}

async function getUserPosts(username) {
    console.log("getting posts for user " + username)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

async function getFollowingPosts(username) {
    console.log("getting posts for user " + username)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return e;
    }
    return null
}

module.exports = {createUser, loginUser, getUserPosts, getFollowingPosts}