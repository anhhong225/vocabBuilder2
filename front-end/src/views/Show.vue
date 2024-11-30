<template>
    <div>
      <h1>Show Word</h1>
      <div
        v-for="(value, lang) in word.languages"
        :key="lang"
        class="ui labeled input fluid">
        <div class="ui label">
          <i :class="getFlagClass(lang) + ' flag'"></i> {{ capitalize(lang) }}
        </div>
        <input type="text" readonly :value="value" />
      </div>
      <div class="actions">
        <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
          Edit word
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';

  export default {
    name: 'show',
    data() {
      return {
        word: ''
      };
    },
    async mounted() {
      this.word = await api.getWord(this.$route.params.id);
    },
    methods: {
      getFlagClass(lang) {
        // Define flag classes for supported languages
        const flags = {
          english: 'united kingdom',
          german: 'germany',
          vietnamese: 'vietnam',
          spanish: 'spain',
          french: 'france',
          italian: 'italy',
          japanese: 'japan',
          korean: 'south korea',
          dutch: 'netherlands'
        };
        return flags[lang] || 'world'; // Default to a generic icon if flag not found
      },
      capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
  };
  </script>
  
  <style scoped>
  .actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
  }
  </style>