const UserModel = require('../data_model/User')
const bcrypt = require('bcryptjs');

function modelResponse(data, error) {
    return {
        data: data,
        err: error
    }
}

async function createUser(user) {
    const password = user.password
    user.password = encrypt(password)
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

function encrypt(input) {
    return bcrypt.hashSync(input, 10);
}

async function loginUser(email, password) {
    try {
        const response = await UserModel.find({email: email})
        if (response.length == 0) {
            return modelResponse(null, "Error: can't login with provided credentials")
        }
        const user = response[0]
        if (bcrypt.compareSync(password, user.password)) {
            return modelResponse(user, null)
        } else {
            return modelResponse(null, "Error: can't login with provided credentials")
        }
    } catch (e) {
        return modelResponse(null, e)
    }
}

async function getUser(username) {
    try {
        const response = await UserModel.find({username: username})
        if (response.length == 0) {
            return modelResponse(null, "Error: can't find user with provided credentials")
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

async function followUser(username, userIDToFollow) {
    console.log("toggling follow for " + username)
    try {
        const response = await UserModel.find({username: username})
        const following = response[0].following
        const response2 = await UserModel.find({username: userIDToFollow})
        const followers = response2[0].followers
        // unfollow the user if already being followed
        if (following.includes(userIDToFollow)) {
            console.log('toggling unfollow')
            const index = following.indexOf(userIDToFollow);
            if (index > -1) {
                following.splice(index, 1);
            }
            // remove user from followers list of userIDToFollow
            const index2 = followers.indexOf(username);
            if (index2 > -1) {
                followers.splice(index2, 1);
            }
        }
        // follow user if not in following
        else {
            console.log('toggling follow')
            following.push(userIDToFollow)
            // add user to followers list of userIdToFollow
            followers.push(username)
        }
        const res = await UserModel.updateOne({username: username}, {following: following});
        const res2 = await UserModel.updateOne({username: userIDToFollow}, {followers: followers});
        const data = {
            following: following,
            followers: followers,
        }
        return modelResponse(data, null)
    } catch (e) {
        console.error(e);
        return modelResponse(null, e)
    }
    return null
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

module.exports = {createUser, loginUser, getUserPosts, getFollowingPosts, getUser, deleteUser, followUser}