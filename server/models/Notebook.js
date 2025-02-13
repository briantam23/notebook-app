require('../db');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const NotebookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    sketches: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Sketch',
        },
    ],
});

NotebookSchema.plugin(uniqueValidator);

const Notebook = mongoose.model('Notebook', NotebookSchema);


module.exports = Notebook;
