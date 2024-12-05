<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out all required fields!</p>
    <!-- Default Language Fields -->
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="vietnam flag"></i> Vietnamese
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.vietnamese" />
    </div>

    <!-- Dynamically Added Language Fields -->
    <div
      class="ui labeled input fluid" v-for="(label, lang) in addLanguages"
      :key="lang" style="position:relative;"> <!-- Loop through dynamically added languages -->
      <div class="ui label"><!-- Display flag-->
        <i :class="languageFlags[lang] + ' flag'"></i> {{ capitalize(label) }}
      </div><!-- Input field for each language -->
      <input type="text" :placeholder="'Enter word in ' + capitalize(label)" v-model="word[lang]"/> <!--Two-way binding with the `word` object-->
      <span class="remove-text" @click="removeLanguage(lang)">remove</span> <!--click text to remove-->
    </div>

    <!-- Language selection dropdown -->
    <div class="ui fluid selection dropdown" @click="toggleDropdown">
      <input type="hidden" name="language" />
      <i class="dropdown icon"></i>
      <div class="default text">Select Language</div>
      <div class="menu" v-show="dropdownOpen"><!-- Show menu only if `dropdownOpen` is true -->
        <!-- Loop through all available languages -->
        <div class="item" v-for="(flag, lang) in allLanguages" 
          :key="lang" v-if="!word[lang]" @click="addLanguage(lang)"><!-- Only show languages not already added -->
          <i :class="languageFlags[lang] + ' flag'"></i> {{ capitalize(lang) }}
        </div>
      </div>
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: "word-form",//component name
  props: {
    word: {
      type: Object,
      required: false, 
      default: () => ({// Default languages with empty values
        english: "",
        german: "",
        vietnamese: ""
      })
    }
  },
  data() {
    return {
      errorsPresent: false,
      dropdownOpen: false, //tracking dropdown visibility
      addLanguages: {}, // Store dynamically added languages
      allLanguages: {
        // All available languages
        spanish: "spanish",
        italian: "italian",
        japanese: "japanese",
        korean: "korean",
        french: "french",
        dutch: "dutch",
        thailand: "thailand"
      },
      languageFlags: {
        // Flags for each language
        french: "france",
        spanish: "spain",
        italian: "italy",
        japanese: "japan",
        korean: "south korea",
        dutch: "netherlands",
        thailand: "thailand"
      }
    };
  },
  mounted() {
    // Populate addLanguages dynamically from the word prop
    for (const lang in this.word) {
      if (!(lang === "english" || lang === "german" || lang === "vietnamese")) {
        this.$set(this.addLanguages, lang, this.allLanguages[lang] || lang);
      }
    }
  },
  methods: {
    capitalize(text) { //capitalize the first letter
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    toggleDropdown() {// Toggle dropdown menu visibility
      this.dropdownOpen = !this.dropdownOpen;
    },
    addLanguage(lang) {// Add a new language to the form
      if (!this.word[lang]) {//check if already have
        this.$set(this.word, lang, "");// Initialize the language with an empty string
        this.$set(this.addLanguages, lang, this.allLanguages[lang]);// Add to addLanguages
      }
    },
    removeLanguage(lang) {
      this.$delete(this.word, lang);// Remove from word object
      this.$delete(this.addLanguages, lang);// Remove addLang
    },
    onSubmit() {
      this.errorsPresent = Object.entries(this.word).some(// Validate required fields
        ([lang, value]) =>
          value === "" && // Check for empty value
          (lang === "english" || lang === "german" || lang === "vietnamese" || lang in this.addLanguages)
      );
      // If validation passes, emit the data  
      if (!this.errorsPresent) {
        const languageWord = {
          languages: { ...this.word } // This nests all fields inside a `languages` key
        };
        this.$emit("createOrUpdate", languageWord);// Emit the form data
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.ui.dropdown .menu {/* Dropdown menu styling */
  display: block;
  position: absolute;
  z-index: 1000;/* Ensure it appears above other elements */
  background: white;
  border: 1px solid #ccc;
  width: 100%;
}
.ui.dropdown .item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
