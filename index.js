import express from "express";
import bodyParser from "body-parser";
import fileupload from "express-fileupload";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { title } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const  datePuplished =  new Date().toJSON().slice(0,10).replace(/-/g,'/');

app.use(fileupload());

var post = JSON.parse(fs.readFileSync("data.json"))

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
  res.render("index.ejs");
});

app.get("/about", (req,res) => {
  res.render("about.ejs");
});  


app.get("/contact", (req,res) => {
  res.render("contact.ejs");
});

app.get("/read", (req,res) => {
  res.render("read.ejs", {post : post});
});


app.post("/contact", (req, res) => {
  res.render("contact.ejs");
});

// Handling the post form
app.post("/read", (req, res) => {
  const image  = req.files['post_img'];
  image.mv(__dirname + '/public/styles/images/' + image.name);
  var newPost = {
    id : parseInt(req.body["idNumber"]),
    author : req.body["author_name"],
    tags : req.body["tags"],
    subhead : req.body["subheading"],
    content : req.body["article_body"],
    title : req.body["article_title"],
    img_path : "\\styles\\images\\" + image.name
  }
  post.push(newPost)
  //fs.writeFileSync("data.json", JSON.stringify(post)) uncomment if u want to save to data file
  res.render("read.ejs", { post : post});
});


app.get("/view/post:id", (req, res) => {
  const postId = parseInt(req.params.id); // Extract post ID from URL params
  const postViewing = post.find(post => post.id === postId); // Find post by ID
  if (!postViewing) {
      res.status(404).send("Post not found");
      return;
  }

  res.render("viewpost.ejs", { viewPost: postViewing, year: datePuplished});
});


// Handling the delete selection
app.post("/delete", (req, res) => {
  const chosenId = parseInt(req.body["selectMenu"]);
  post = post.filter(post => post.id != chosenId);
  //fs.writeFileSync("data.json", JSON.stringify(post)) uncomment if u want to save to data file
  res.render("read.ejs", {post: post});
});


// Handling the edit form
app.post("/edit:id", (req, res) => {
  const image  = req.files['edit_post_img'];
  image.mv(__dirname + '/public/styles/images/' + image.name);
  var editedPost = {
    id : parseInt(req.params.id),
    author : req.body["edit_author_name"],
    tags : req.body["edit_tags"],
    subhead : req.body["edit_subheading"],
    content : req.body["edit_article_body"],
    title : req.body["edit_article_title"],
    img_path : "\\styles\\images\\" + image.name
  }
  const i = post.findIndex(x => x.id === editedPost.id)
  post[i] = editedPost
  //fs.writeFileSync("data.json", JSON.stringify(post)) uncomment if u want to save to data file
  res.render("viewpost.ejs", { viewPost : editedPost , year : datePuplished});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
