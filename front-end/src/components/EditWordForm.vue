<template>
    <form action="#" @submit.prevent="onSubmit"><!-- Form with `onSubmit` method handling submission, preventing default behavior -->
      <p v-if="errorsPresent" class="error">Please fill out all required fields!</p>
      <!-- Dynamically Render Language Inputs -->
      <div v-for="(value, lang) in word" :key="lang" class="ui labeled input fluid"><!--iteration lang in word-->
        <div class="ui label">
          <!-- Label with dynamic flag icon and language name -->
           <!--v-bind:class-->
          <i :class="languageFlags[lang] + ' flag'"></i> {{ lang.charAt(0).toUpperCase() + lang.slice(1) }}
        </div>
        <!-- Input field bound to the corresponding language property in the `word` object -->
        <input type="text" :placeholder="'Enter word ...' " v-model="word[lang]"/>
      </div>
      <button class="positive ui button">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'word-form',
    props: {
      word: { //word prop
        type: Object, //an object type
        required: true // The `word` must be provided
      }
    },
    data() {
      return {
        errorsPresent: false,
        languageFlags: { // Map of languages to their corresponding flag class names
          english: 'united kingdom',
          german: 'germany',
          vietnamese: 'vietnam',
          italian: 'italy',
          korean: 'south korea',
          french: 'france',
          spanish: 'spain',
          japanese: 'japan'
        }
      };
    },
    methods: {
      onSubmit() {
        // Check for any empty required fields
        this.errorsPresent = Object.entries(this.word).some(([_, value]) => !value);
        // If no errors,
        if (!this.errorsPresent) {
          this.$emit('createOrUpdate', this.word); // Emit the word object for update
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  