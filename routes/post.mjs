import express from 'express';
import { nanoid } from 'nanoid';
let router = express.Router()

let posts = [
    {
        id: nanoid(),
        text: "some text",
        title: "abc post title",
    }
];

router.post('/post', (req, res, next) => {
    console.log('Create a Post!', new Date());

    if (!req.body.title || !req.body.text) {
        res.status(403).send(`Required paramater missing`);
        return;
    };

    posts.unshift({
        id: nanoid(),
        text: req.body.title,
        title: req.body.text,
    })
    res.status(200).send('Post created successfully!');
})

router.get('/posts', (req, res, next) => {
    console.log('Get all posts!', new Date());
    res.send(posts);
})

router.get('/post/:postId', (req, res, next) => {
    console.log('Finding a post!', new Date());

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.status(200).send(posts[i]);
            return;
        }
    }

    res.status(403).send('Post not found with id ' + req.params.postId);
})
router.put('/post/:postId', (req, res, next) => {

    if (!req.params.postId
        || !req.body.text
        || !req.body.title) {
        res.status(403).send(`example put body: 
        PUT     /api/v1/post/:postId
        {
            title: "updated title",
            text: "updated text"
        }
        `)
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            posts[i] = {
                text: req.body.text,
                title: req.body.title,
            }
            res.send('post updated with id ' + req.params.postId);
            return;
        }
    }
    res.send('post not found with id ' + req.params.postId);
})
router.delete('/post/:postId', (req, res, next) => {
    console.log('Finding a post!', new Date());

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.status(200).send("post delete successfully")
            posts.splice(i, 1);
            return;
        }
    }
    res.status(403).send('Post not found with id ' + req.params.postId);
})

export default router