const _ = require('lodash');
const express = require("express");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Course, validate} = require("../models/course");

const router = express.Router();

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}

router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });
  res.send(course);
});

// router.get('/:id', asyncMiddleware(async (req, res) => {
//     const course = await Course.findOne({ _id: req.params.id });
//     res.send(course);
// }));

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = new Course(_.pick(req.body, ['name', 'author', 'tags', 'ispublished']));
    await course.save();

    res.send(course);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    try {
      const course = await Course.deleteOne({ _id: req.params.id });
      res.status(200).send(course);
    } catch {
      res.status(404).send({ error: "Course doesn't exist!" });
    }
});

router.put('/:id', async (req, res) => {
    try {
      const course = await Course.findOne({ _id: req.params.id });
  
      if (req.body.name) {
        course.name = req.body.name;
      }
  
      if (req.body.author) {
        course.author = req.body.author;
      }
  
      if (req.body.tags) {
        course.tags = req.body.tags;
      }
  
      if (req.body.ispublished) {
        course.ispublished = req.body.ispublished;
      }
  
      await course.save();
      res.send(course);
    } catch {
      res.status(404).send({ error: "Course doesn't exist!" });
    }
});

module.exports = router;