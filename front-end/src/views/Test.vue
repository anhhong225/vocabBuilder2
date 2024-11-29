<template>
    <div>
      <h1>Test</h1>
      <div v-if="words.length < 5"> <!--check if there are fewer than 5 words-->
        <p>You need to enter at least five words to begin the test</p>
      </div>
      <div v-else><!--At least having 5 words-->
        <vocab-test :words="words"></vocab-test><!-- Pass the `words` as a prop to VocabTest -->
      </div>
    </div>
  </template>
  
  <script>// Importing modules and components
  import { api } from '../helpers/helpers';
  import VocabTest from '../components/VocabTest.vue';
  
  export default {
    name: 'test', //component's name
    components: {
      'vocab-test': VocabTest//export the vocabTest component locally
    },
    data() {
      return {
        words: [] //data property to store the fetched words
      };
    },
    async mounted() {
      this.words = await api.getWords();//fetch words from api and assign them to the `words`
    }
  };
  </script>