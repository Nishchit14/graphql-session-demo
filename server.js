var express = require("express")
var express_graphql = require("express-graphql")
var { buildSchema } = require("graphql")
var  axios = require("axios")


var schema = buildSchema(`
        type Query {
            name: String,
            surname: String
            post(id: Int): Post
            posts: [Post!]!
        }
        type Post {
            id: String,
            title: String
            body: String
        }
`)

var root = {
    name: ()=> "Name is nothing",
    surname: ()=> "not needed",
    post: async({ id })=> {
        let posts = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return posts.data
    },
    posts: async()=> {
        let posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return posts.data
    }
}


var app = express()

app.use("/graphql", express_graphql({
    schema,
    rootValue: root
}))

app.listen(4000, ()=> console.log("Server is running on 4000"))