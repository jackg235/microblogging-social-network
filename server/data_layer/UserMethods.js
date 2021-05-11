const UserModel = require('../data_model/User')
const PostAnalyticsModel = require('../data_model/PostAnalytics')

const PostModel = require('../data_model/Post')
const bcrypt = require('bcryptjs');
const path = require('path')
const fs = require('fs')

function modelResponse(data, error) {
    return {
        data: data,
        err: error
    }
}

async function newProfileImage(username, file) {
    const img = {
        data: fs.readFileSync(file.path),
        contentType: "image/jpeg"
    }
    try {
        const response = await UserModel.updateOne({username: username}, {img: img})
        return modelResponse(response, null)
    } catch (e) {
        console.log(e)
        return modelResponse(null, e)
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
        const newAnalytics = new PostAnalyticsModel({username: user.username})
        await newAnalytics.save()
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
        const posts = response[0].posts
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].username === username) {
                await PostModel.deleteOne({_id: posts[i]._id})
            } else {
                // remove username's comments and update post
                let comments = posts[i].comments
                let newComments = []
                for (let i = 0; i < comments.length; i++) {
                    if (!comments[i].username === username) {
                        // newComments.push(comments[i])
                    }
                }
            }
        }
        await UserModel.deleteOne({username: username})
        return modelResponse(null, null)
    } catch (e) {
        return modelResponse(null, e)
    }
}

async function changePassword(username, newPassword) {
    const pw = encrypt(newPassword)
    try {
        const updated = await UserModel.updateOne({username: username}, {password: pw});
        return modelResponse(updated, null)
    } catch (e) {
        return modelResponse(null, e)
    }
}

async function followUser(username, userToFollow) {
    console.log("toggling follow for " + username + " " + userToFollow)
    try {
        const response = await UserModel.find({username: username})
        const following = response[0].following
        const response2 = await UserModel.find({username: userToFollow})
        const followers = response2[0].followers
        // unfollow the user if already being followed
        if (following.includes(userToFollow)) {
            console.log('toggling unfollow')
            const index = following.indexOf(userToFollow);
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
            // make sure user isn't blocked before we allow them to follow
            const blockedBy = response[0].blockedBy
            if (!blockedBy.includes(userToFollow)) {
                // add userToFollow to following list of current user
                following.push(userToFollow)
                // add current user to followers list of userToFollow
                followers.push(username)
            } else {
                return modelResponse(null, "Error: can't follow user that is blocking you")
            }


        }
        const res = await UserModel.updateOne({username: username}, {following: following});
        const res2 = await UserModel.updateOne({username: userToFollow}, {followers: followers});
        const data = {
            following: following,
            followers: followers,
        }
        return modelResponse(data, null)
    } catch (e) {
        console.error(e);
        return modelResponse(null, e)
    }
}

async function blockUser(username, userToBlock) {
    console.log("toggling block for " + username + " " + userToBlock)
    try {
        const response = await UserModel.find({username: userToBlock})
        const blockedBy = response[0].blockedBy
        let blockedFollowing = response[0].following

        const blockerResponse = await UserModel.find({username: username})
        const blocking = blockerResponse[0].blocking
        // unblock the user if they are already blocked
        if (blockedBy.includes(username)) {
            console.log('toggling unblock')
            const index = blockedBy.indexOf(username);
            if (index > -1) {
                blockedBy.splice(index, 1);
            }

            const index2 = blocking.indexOf(userToBlock);
            if (index2 > -1) {
                blocking.splice(index2, 1);
            }
        }
        // block user if not in blockedBy
        else {
            console.log('toggling block')
            blockedBy.push(username)
            blocking.push(userToBlock)

            // remove userToBlock from followers of username if present there
            const blockerFollowers = blockerResponse[0].followers
            if (blockedFollowing.includes(username)) {
                const followingIndex = blockedFollowing.indexOf(username);
                if (followingIndex > -1) {
                    blockedFollowing.splice(followingIndex, 1);
                }
                await UserModel.updateOne({username: userToBlock}, {following: blockedFollowing});

                const followerIndex = blockerFollowers.indexOf(userToBlock);
                if (followerIndex > -1) {
                    blockerFollowers.splice(followerIndex, 1);
                }
                await UserModel.updateOne({username: username}, {followers: blockerFollowers});
            }
        }
        await UserModel.updateOne({username: userToBlock}, {blockedBy: blockedBy});
        await UserModel.updateOne({username: username}, {blocking: blocking});
        const data = {
            following: blockedFollowing,
            blocking: blocking
        }
        return modelResponse(data, null)
    } catch (e) {
        console.error(e);
        return modelResponse(null, e)
    }
}

async function getBlockedBy(username) {
    try {
        const userRes = await UserModel.find({username: username})
        blockedBy = userRes[0].blockedBy
        console.log(blockedBy)
        return modelResponse(blockedBy, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function getContacts(username) {
    try {
        const userRes = await UserModel.find({username: username})
        const allUsers = await UserModel.find()

        followers = userRes[0].followers
        followerObjs = []
        for (let i = 0; i < followers.length; i++) {
            let follower = allUsers.find(user => {
                return user.username === followers[i]
            })
            if (follower !== undefined) {
                followerObjs.push({
                    username: follower.username,
                    first: follower.first,
                    last: follower.last,
                    // img: follower.img,
                })
            }
        }

        following = userRes[0].following
        followingObjs = []
        for (let i = 0; i < following.length; i++) {
            let followingUser = allUsers.find(user => {
                return user.username === following[i]
            })
            if (followingUser !== undefined) {
                followingObjs.push({
                    username: followingUser.username,
                    first: followingUser.first,
                    last: followingUser.last,
                    // img: followingUser.img,
                })
            }
        }
        console.log('following object 0... ')
        console.log(followingObjs[0])
        console.log(typeof followingObjs[0])
        console.log(typeof followingObjs)

        const data = {
            following: followingObjs,
            followers: followerObjs,
        }
        return modelResponse(data, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function getBlocking(username) {
    try {
        const userRes = await UserModel.find({username: username})
        const blockedBy = userRes[0].blockedBy
        const blocking = userRes[0].blocking
        const data = {
            blockedBy: blockedBy,
            blocking: blocking,
        }
        return modelResponse(data, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function getSuggested(username) {
    try {
        const userRes = await UserModel.find({username: username})
        const following = userRes[0].following
        const blockedBy = userRes[0].blockedBy
        const allUsers = await UserModel.find()
        const finalUsers = []
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].username !== username && !following.includes(allUsers[i].username) && !blockedBy.includes(allUsers[i].username)) {
                finalUsers.push({
                    username: allUsers[i].username,
                    first: allUsers[i].first,
                    last: allUsers[i].last,
                })
            }
        }

        // shuffle array
        for (let i = finalUsers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = finalUsers[i];
            finalUsers[i] = finalUsers[j];
            finalUsers[j] = temp;
        }

        return modelResponse(finalUsers, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

async function getAllUsers() {
    try {
        const usersRes = await UserModel.find()
        const usernames = []
        for (let i = 0; i < usersRes.length; i++) {
            usernames.push(usersRes[i].username)
        }

        return modelResponse(usernames, null)
    } catch (e) {
        return modelResponse(null, e);
    }
}

// DELETE (already in post methods)
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

// DELETE (already in post methods)
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

module.exports = {
    createUser,
    loginUser,
    getUserPosts,
    getFollowingPosts,
    getUser,
    deleteUser,
    followUser,
    blockUser,
    getBlockedBy,
    getContacts,
    newProfileImage,
    getSuggested,
    changePasswordMethod: changePassword,
    getBlocking,
    getAllUsers,
}