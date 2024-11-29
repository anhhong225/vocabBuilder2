const mongoose = require('mongoose');//import Mongoose object models tool

const Schema = mongoose.Schema;
//Format for model 'VocabSchema'
//creating an instance of the Schema class
const VocabSchema = new Schema(
    {
        languages: {//define a languages attribute, which is an object
            type: Object,
            required: 'This word cannot be blank'//is required with a error message
        }
    },
    {collection: 'vocab2'}// specifying a name for collection
);
//solidify Schema as a data model and export for use in other areas of project
module.exports = mongoose.model('Vocab', VocabSchema);