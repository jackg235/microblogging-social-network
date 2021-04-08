function newUser(first, last, email, username, password) {
    const user = {
        first: first,
        last: last,
        email: email,
        password: password,
        username: username,
        following: [],
        posts: [],
        registrationDate: new Date().toLocaleDateString()
    }
    return user
}

module.exports = {newUser}