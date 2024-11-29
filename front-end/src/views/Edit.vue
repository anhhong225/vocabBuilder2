<template>
    <div>
      <h1>Edit Word</h1>
      <word-form :word="word" @createOrUpdate="createOrUpdate" />
    </div>
  </template>
  
  <script>
  import WordForm from '../components/EditWordForm.vue';
  import { api } from '../helpers/helpers';
  
  export default {
    name: 'edit-word',
    components: {
      'word-form': WordForm
    },
    data() {
      return {
        word: {} // Initially empty
      };
    },
    async mounted() {
      // Fetch the word by its ID and populate the form
      const fetchedWord = await api.getWord(this.$route.params.id);
      this.word = { ...fetchedWord.languages }; // Extract the `languages` field into the `word` prop
    },
    methods: {
      async createOrUpdate(updatedWord) {
        const wordData = {
          _id: this.$route.params.id,
          languages: { ...updatedWord } // Include all languages
        };
  
        await api.updateWord(wordData);
        this.flash('Word updated successfully!', 'success');
        this.$router.push(`/words/${this.$route.params.id}`);
      }
    }
  };
  </script>
  