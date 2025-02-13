const express = require('express');
const Notebook = require('./../models/Notebook');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const notebooks = await Notebook.find();
    res.json(notebooks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id).populate('sketches');
    if (!notebook) {
      return res.status(404).send('Notebook not found');
    }
    res.json(notebook);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newNotebook = await Notebook.create(req.body);
    res.json(newNotebook);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedNotebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedNotebook) {
      return res.status(404).send('Notebook not found');
    }
    res.json(updatedNotebook);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedNotebook = await Notebook.findByIdAndDelete(req.params.id);
    if (!deletedNotebook) {
      return res.status(404).send('Notebook not found');
    }
    res.json({
      message: 'Notebook deleted'
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
