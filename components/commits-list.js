(function() {
    Vue.component('commits-list', {
        template: `<div>
                        <p class="control">
                            <span class="select">
                                <select v-on:change="changeBranch" v-model="actual_branch">calvingerling
                                    <option v-for="branch in commits.branchs" :value="branch.name">{{branch.name}}</option>
                                </select>
                            </span>
                        </p>
                        <div class="box" v-for="commit in commits.commits">
                            <article class="media">
                                <div class="media-left">
                                    <figure class="image is-64x64">
                                        <img :src="commit.committer.avatar_url" alt="Commiter profile picture">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <a target="_blank" :href="commit.committer.html_url"><strong>{{commit.commit.committer.name}}</strong></a> <small>{{commit.commit.committer.email}}</small> <small>{{commit.commit.committer.date | time from now }}</small>
                                            <br>
                                            <a class="commit-msg" target="_blank" :href="commit.html_url">{{commit.commit.message}}</a>
                                        </p>
                                    </div>
                                </div>
                                <div class="media-right">
                                    <a class="level-item" :href="commit.html_url" target="_blank">
                                        <span class="icon is-small"><i class="fa fa-comments"></i></span>
                                    </a>
                                </div>
                            </article>
                        </div>
                    </div>`,
        computed: {
            selected: () => '',
            commits: () => store.state.commits,
            default_branch: () => store.state.user.repositories.filter((repository) => repository.name == store.state.commits.repository)[0].default_branch
        },
        data: () => {
            return {
                actual_branch: store.state.user.repositories.filter((repository) => repository.name == store.state.commits.repository)[0].default_branch
            }
        },
        methods: {
            changeBranch: function(event) {
                this.actual_branch = event.target.value;
                this.$http.get(github.get.commitsAt(store.state.user.login, store.state.commits.repository, event.target.value)).then((data) => {
                    store.commit('bindCommits', { commits: data.body, repository: store.state.commits.repository});
                });
            }
        }
    });
})();