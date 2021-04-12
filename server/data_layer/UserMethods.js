const UserModel = require('../data_model/User')

function modelResponse(data, error) {
    return {
        data: data,
        err: error
    }
}

async function createUser(user) {
    const newUser = new UserModel(user)
    try {
        const data = await newUser.save()
        console.log('The following user has been added to the DB: ')
        console.log(data)
        return modelResponse(data, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, "Error: can't register a new user with provided username and/or email.")
    }
}

async function loginUser(email, password) {
    try {
        const response = await UserModel.find({email: email, password: password})
        if (response.length == 0) {
            return modelResponse(null, "Error: can't login with provided credentials")
        }
        return modelResponse(response[0], null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e)
    }
}

async function getUser(username) {
    try {
        const response = await UserModel.find({username: username})
        if (response.length == 0) {
            return modelResponse(null, "Error: can't login with provided credentials")
        }
        return modelResponse(response[0], null)
    } catch (e) {
        return modelResponse(null, e)
    }
}

async function deleteUser(username) {
    try {
        // first check if user exists
        const response = await UserModel.find({username: username})
        if (response.length == 0) {
            return modelResponse(null, "Error: can't delete user that doesn't exist")
        }
        await UserModel.deleteOne({username: username})
        return modelResponse(null, null)
    } catch (e) {
        return modelResponse(null, e)
    }
}

async function getUserPosts(username) {
    console.log("getting posts for user " + username)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return modelResponse(null, e)
    }
    return null
}

async function getFollowingPosts(username) {
    console.log("getting posts for user " + username)
    try {
        // TO DO
    } catch (e) {
        console.error(e);
        return modelResponse(null, e)
    }
    return null
}

module.exports = {createUser, loginUser, getUserPosts, getFollowingPosts, getUser, deleteUser}