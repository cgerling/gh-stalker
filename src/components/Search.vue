<template>
    <div>
        <section class="section">
            <div class="container">
                <form v-on:submit.prevent="search">
                    <p class="control has-addons has-addons-centered">
                        <input v-model="searchTerm" class="input" type="text" placeholder="Find a user">
                        <button type="submit" class="button is-success" :class="{'is-loading': isLoading}">Search</a>
                    </p>
                </form>    
            </div>
        </section>
        <div v-if="result.length > 0">
            <users title="Search result" :users="result" :paging="true" :actualPage="page" :total="result_count" @changePage="changePage"></users>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapState } from 'vuex';
    import { searchUser } from '../services/githubService';
    import Users from './Users.vue';
    import * as types from '../store/mutationTypes';

    export default {
        components: { Users },
        data() {
            let lastSearch = this.$store.state.settings.lastSearch ? this.$store.state.search.last : 
                { searchTerm: '', result_count: 0, page: 1, result: [] };
            return {
                searchTerm: lastSearch.term,
                result_count: lastSearch.total,
                page: lastSearch.page,
                result: lastSearch.result
            };
        },
        computed: {
            ...mapGetters({
                isLoading: 'page_loading'
            }),
            ...mapState({
                searchCount: state => state.search.count,
                userSelected: state => state.page.userSelected
            })
        },
        methods: {
            search(e, page) {
                let self = this;
                self.$store.commit(types.PAGE_IS_LOADING);

                searchUser(self.searchTerm, page).then(response => {
                    self.result = response.data.items;
                    self.result_count = response.data.total_count;
                    self.$store.dispatch('saveLastSearch', { term: self.searchTerm, page, total: response.data.total_count, result: response.data.items});
                    self.$store.commit(types.INCREASE_SEARCH_COUNT);
                    self.$store.commit(types.UPDATE.PAGE, { isOk: response.status == 200, status: response.statusText });
                }, response => {
                    self.$store.commit(types.INCREASE_SEARCH_COUNT);
                    self.$store.commit(types.UPDATE.PAGE, { isOk: response.status == 200, status: response.statusText, message: response.body.message });
                });
            },
            changePage({ type, actual_page }) {
                this.search(undefined, actual_page);
            }
        }
    }
</script>
<style></style>