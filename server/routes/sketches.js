const express = require('express');
const Sketch = require('./../models/Sketch');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const sketches = await Sketch.find();
    res.json(sketches);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sketch = await Sketch.findById(req.params.id);
    if (!sketch) {
      return res.status(404).send('Sketch not found');
    }
    res.json(sketch);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newSketch = await Sketch.create(req.body);
    res.json(newSketch);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSketch = await Sketch.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedSketch) {
      return res.status(404).send('Sketch not found');
    }
    res.json(updatedSketch);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSketch = await Sketch.findByIdAndDelete(req.params.id);
    if (!deletedSketch) {
      return res.status(404).send('Sketch not found');
    }
    res.json({
      message: 'Sketch deleted'
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
