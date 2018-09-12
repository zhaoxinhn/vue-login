<template>
    <div class="hello">
        <button @click="logout">退出</button>
    </div>
</template>

<script>
    import Auth from '@/utils/auth'
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        methods: {
            logout: function (event) {
                console.log('logout')
                Auth.logout()
				this.$router.push('/login');
				// console.log(this.$router)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
