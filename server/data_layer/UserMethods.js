const {db} = require('./MongoAccessor')

async function addUser(user) {
    console.log(user)
    try {
        // insert user
        db.collection('users').insertOne(user, (err) => {
            if (err) {
                console.log(err)
                return err;
            }
        });

    } catch (e) {
        console.error(e);
        return e;
    }
    return null;
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

module.exports = {addUser, getUserPosts, getFollowingPosts}