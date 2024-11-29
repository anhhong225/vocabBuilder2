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
      class="ui labeled input fluid"
      v-for="(label, lang) in additionalLanguages"
      :key="lang"
      style="position:relative;"
    >
      <div class="ui label">
        <i :class="languageFlags[lang] + ' flag'"></i> {{ capitalize(label) }}
      </div>
      <input
        type="text"
        :placeholder="'Enter word in ' + capitalize(label)"
        v-model="word[lang]"
      />
      <span class="remove-text" @click="removeLanguage(lang)">remove</span>
    </div>

    <!-- Language selection dropdown -->
    <div class="ui fluid selection dropdown" @click="toggleDropdown">
      <input type="hidden" name="language" />
      <i class="dropdown icon"></i>
      <div class="default text">Select Language</div>
      <div class="menu" v-show="dropdownOpen">
        <div
          class="item"
          v-for="(flag, lang) in allLanguages"
          :key="lang"
          v-if="!word[lang]"
          @click="addLanguage(lang)"
        >
          <i :class="languageFlags[lang] + ' flag'"></i> {{ capitalize(lang) }}
        </div>
      </div>
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: "new-word-form",
  props: {
    word: {
      type: Object,
      required: false,
      default: () => ({
        english: "",
        german: "",
        vietnamese: ""
      })
    }
  },
  data() {
    return {
      errorsPresent: false,
      dropdownOpen: false,
      additionalLanguages: {}, // Store dynamically added languages
      allLanguages: {
        // All available languages
        spanish: "spanish",
        italian: "italian",
        japanese: "japanese",
        korean: "korean",
        french: "french",
        dutch: "dutch"
      },
      languageFlags: {
        // Flags for each language
        french: "france",
        spanish: "spain",
        italian: "italy",
        japanese: "japan",
        korean: "south korea",
        dutch: "netherlands"
      }
    };
  },
  mounted() {
    // Populate additionalLanguages dynamically from the word prop
    for (const lang in this.word) {
      if (!(lang === "english" || lang === "german" || lang === "vietnamese")) {
        this.$set(this.additionalLanguages, lang, this.allLanguages[lang] || lang);
      }
    }
  },
  methods: {
    capitalize(text) {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    addLanguage(lang) {
      if (!this.word[lang]) {
        this.$set(this.word, lang, "");
        this.$set(this.additionalLanguages, lang, this.allLanguages[lang]);
      }
    },
    removeLanguage(lang) {
      this.$delete(this.word, lang);
      this.$delete(this.additionalLanguages, lang);
    },
    onSubmit() {
      this.errorsPresent = Object.entries(this.word).some(
        ([lang, value]) =>
          value === "" &&
          (lang === "english" || lang === "german" || lang === "vietnamese" || lang in this.additionalLanguages)
      );

      if (!this.errorsPresent) {
        const languageWord = {
          languages: { ...this.word } // This nests all fields inside a `languages` key
        };
        this.$emit("createOrUpdate", languageWord);
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.ui.dropdown .menu {
  display: block;
  position: absolute;
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
}
.ui.dropdown .item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
