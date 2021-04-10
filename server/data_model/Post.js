function newPost(username, title, content, media) {
    const post = {
        username: username,
        title: title,
        content: content,
        media: media,
        postDate: new Date(),
        comments: [],
        likes: []
    }
    return post
}

module.exports = {newPost}