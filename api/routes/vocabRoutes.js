/*
Routing determines how an application responds to a client
request for a specific endpoint (URI or path)
and HTTP request methos (GET, POST,...)
*/
const vocabBuilder = require('../controllers/vocabController');
module.exports = app => {
    app
        .route('/words') //words has two methods: get, post
        .get(vocabBuilder.list_all_words)
        .post(vocabBuilder.create_a_word);
app
    .route('/words/:wordId') //words/wordId has: get, post, delete
    .get(vocabBuilder.read_a_word) //call handler function
    .put(vocabBuilder.update_a_word)
    .delete(vocabBuilder.delete_a_word);
};