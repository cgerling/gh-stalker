(function() {
    Vue.component('repository-list', {
        template: `<nav class="panel">
                        <p class="panel-heading">
                            <span class="tag is-primary">{{repositories.length}}</span>
                            Repositories
                        </p>
                        <a v-for="repository in repositories" v-on:click="getCommits" class="panel-block" :data-branch="repository.default_branch" href="#commits">
                            <span class="panel-icon">
                                <i v-if="repository.fork" class="fa fa-code-fork"></i>
                                <i v-else class="fa fa-book"></i>
                            </span>
                            <p>{{repository.name.trim()}}</p>
                        </a>
                    </nav>`,
        computed: {
            user: () => store.state.user.login,
            repositories: () => store.state.user.repositories
        },
        methods: {
            getCommits: function(event) {
                let self = this;
                this.$http.get(github.get.commits(self.user, event.target.innerText)).then((data) => {
                    store.commit('bindCommits', { commits: data.body, repository: event.target.innerText });
                    store.dispatch('getBranchs', event.target.innerText);
                });
            }
        }
    });
})();