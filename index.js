import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;
let posts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
  });

app.post("/post", (req, res) => {
    const {title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.redirect("/");
});

app.get("/post/:id/edit", (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = posts.find(post => post.id === postId);
    res.render("edit", { post: postToEdit});
});

 app.post("/post/:id/edit", (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedTitle = req.body["title"];
    const updatedContent = req.body["content"];
    const postToUpdate = posts.find(post => post.id === postId);
    postToUpdate["title"] = updatedTitle;
    postToUpdate["content"] = updatedContent;
    res.redirect("/");
 });

 app.get("/post/:id/delete", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });