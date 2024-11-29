<template>
    <form action="#" @submit.prevent="onSubmit">
      <p v-if="errorsPresent" class="error">Please fill out all required fields!</p>
  
      <!-- Dynamically Render Language Inputs -->
      <div v-for="(value, lang) in word" :key="lang" class="ui labeled input fluid">
        <div class="ui label">
          <i :class="languageFlags[lang] + ' flag'"></i> {{ lang.charAt(0).toUpperCase() + lang.slice(1) }}
        </div>
        <input
          type="text"
          :placeholder="'Enter word ...' "
          v-model="word[lang]"
        />
      </div>
  
      <button class="positive ui button">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    name: 'word-form',
    props: {
      word: {
        type: Object,
        required: true // The `word` must be provided as a prop
      }
    },
    data() {
      return {
        errorsPresent: false,
        languageFlags: {
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
  