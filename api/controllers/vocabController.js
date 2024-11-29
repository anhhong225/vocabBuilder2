const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab'); //import the model 'Vocab' that already in vocabWeb.js
//export functions to use in routes
exports.list_all_words = (req, res) => {
    Vocab.find({}, (err, words) => { //mongoose method
        if(err) res.send(err);//send res if error
        res.json(words);//otherwise, send the retrieved as a JSON response
    }); 
};

exports.create_a_word = (req, res) =>{
    const newWord = new Vocab(req.body);//create a Vocab instance by request body
    newWord.save((err, word) => {//save new word to database
        if(err) res.send(err);//send res if error
        res.json(word);//otherwise, send the saved word as JSON response
    });
};

exports.read_a_word = (req, res) => {
    Vocab.findById(req.params.wordId, (err, word) => {//using mongoose method to retrieve a document by Id
        if(err) res.send(err);//send res if error
        res.json(word);//Otherwise, send the retrieve word as JSON 
    });
};

exports.update_a_word = (req,res) => {
    Vocab.findOneAndUpdate(//mongoose method to update by Id
        { _id: req.params.wordId },//query to find by Id
        req.body,//data to  update
        {new: true},//return the new one
        (err, word) => {
            if(err) res.send(err);//send res if  error
            res.json(word);//otherwise, send the update word as a JSON
        }
    );
};

exports.delete_a_word = (req,res) => {
    Vocab.deleteOne({_id:req.params.wordId},err=>{//moongose method  to remove by Id
        if(err) res.send(err);//send response if error
        res.json({
            message: 'Word successfully deleted',//confirmation message
            _id: req.params.wordId//return the id of the deleted word
        });
    });
};