const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const PostModel = require('../data_model/Post')
const UserModel = require('../data_model/User')
const crypto = require('crypto')

const testPost = {
    username: "testpersist",
    title: "This is a test post",
    content: "this is test post content. users can write stuff here"
}
const testPost2 = {
    username: "testpersist",
    title: "This is another test post",
    content: "this is test post content again! users can write stuff here."
}

describe('Blog/post Endpoints', () => {
    it('should create a new post', async (done) => {
        const res = await request(app)
            .post('/posts/new')
            .send(testPost)
        expect(res.statusCode).toEqual(200)
        done()
    })
    it('should create & delete a new post', async (done) => {
        const res = await request(app)
            .post('/posts/new')
            .send(testPost2)
        expect(res.statusCode).toEqual(200)
        const postId = JSON.parse(res.text).data._id;
        const res2 = await request(app)
            .delete('/posts/delete')
            .send({
                username: testPost2.username,
                postId: postId
            })
        expect(res2.statusCode).toEqual(200)
        // check that post is no longer in post database
        const posts = await PostModel.find({_id: postId})
        expect(posts.length).toEqual(0)
        // check that post is no longer stored with poster
        const users = await UserModel.find({username: testPost2.username})
        const user = users[0]
        expect(!user.posts.includes(postId))
        done()
    })
    it('should get a post', async (done) => {
        const res = await request(app)
            .post('/posts/new')
            .send(testPost2)
        expect(res.statusCode).toEqual(200)
        const postId = JSON.parse(res.text).data._id;
        const res2 = await request(app).get(`/posts/get/${postId}`)
        expect(res2.statusCode).toEqual(200)
        const postData = JSON.parse(res.text).data
        done()
    })

    it('should comment on a post and then delete the comment', async (done) => {
        // create a post to comment on
        const res = await request(app)
            .post('/posts/new')
            .send(testPost2)
        expect(res.statusCode).toEqual(200)
        const postId = JSON.parse(res.text).data._id;
        const testComment = {
            postId: postId,
            commenterId: "some username",
            content: "this is test post comment! users can write stuff here."
        }
        // add the comment
        const addCommentResponse = await request(app)
            .post('/posts/addComment')
            .send(testComment)
        expect(addCommentResponse.statusCode).toEqual(200)
        const response = JSON.parse(addCommentResponse.text).data;
        expect(response.nModified).toEqual(1)
        /*
        // delete the comment
        const deleteComment = {
            commentId: commentId,
            postId: postId
        }
        const deleteResponse = await request(app)
            .delete('/posts/deleteComment')
            .send(deleteComment)
        expect(deleteResponse.statusCode).toEqual(200)

        const postResponse = await request(app).get(`/posts/get/${postId}`)
        const postData = JSON.parse(postResponse.text).data
        expect(!postData.comments.includes(commentId))

         */
        done()
    })
    afterAll(async (done) => {
        await PostModel.deleteMany({title: testPost.title})
        await PostModel.deleteMany({title: testPost2.title})
        await mongoose.connection.close()
        done()
    })
})