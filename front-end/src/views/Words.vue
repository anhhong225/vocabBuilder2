<template>
    <div>
        <h1>Words</h1>
        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th v-for="(label, lang) in displayLanguages" :key="lang">
                        {{ label }}
                    </th>
                    <th colspan="3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="word in words" :key="word._id">
                    <td v-for="(label, lang) in displayLanguages" :key="lang">
                        {{ word[lang] || word.languages?.[lang] || '' }}
                    </td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link>
                    </td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link>
                    </td>
                    <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                        <a :href="`/words/${word._id}`">Destroy</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
    name: 'words',
    data() {
        return {
            words: []
        };
    },
    computed: {
        displayLanguages() {
            const languages = new Set(['english', 'german', 'vietnamese']); // Default languages
            this.words.forEach(word => {
                if (word.languages) {
                    Object.keys(word.languages).forEach(lang => languages.add(lang));
                }
            });
            return Array.from(languages).reduce((acc, lang) => {
                acc[lang] = this.capitalize(lang);
                return acc;
            }, {});
        }
    },
    methods: {
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            this.words = this.words.filter(word => word._id !== id);
            this.flash('Word deleted successfully!', 'success');
        },
        capitalize(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    },
    async mounted() {
        this.words = await api.getWords();
    }
};
</script>

<style scoped>
.actions a {
    display: inline-block;
    margin: 0 5px;
    text-decoration: underline;
}
</style>
