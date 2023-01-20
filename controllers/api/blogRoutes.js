const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Blog.findAll({ include: [User, Comment] })
    .then((dbBlogs) => {
      res.json(dbBlogs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id, { include: [User, Comment] })
    .then((dbBlog) => {
      res.json(dbBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "You are not logged in." });
  }
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.session.user.id,
  })
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "You are not logged in." });
  }
  Blog.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


