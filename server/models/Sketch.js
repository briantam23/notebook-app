require('../db');
const mongoose = require('mongoose');


const SketchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

const Sketch = mongoose.model('Sketch', SketchSchema);


module.exports = Sketch;