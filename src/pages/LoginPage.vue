<template>
    <div class="flex items-center justify-center">
        <div class="w-full max-w-md pt-40">
            <form class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                <!-- @csrf -->
                <div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                    Employee Login
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-normal mb-2" for="username">
                        Email
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="email" v-model="form.email" type="email" required autofocus placeholder="Email" />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-normal mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        v-model="form.password" type="password" placeholder="Password" name="password" required
                        autocomplete="current-password" />
                </div>
                <div class="flex items-center justify-between">
                    <button
                        @click="login()"
                        class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                        type="button">Sign In</button>
                    
                    <router-link class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800" :to="{ name : 'register' }">
                        Create a new account
                    </router-link>
                </div>
            </form>
            
        </div>
    </div>
</template>
<script>
import Api from '../network/Api'
export default{
    name: 'LoginPage',
    data: function() {
        return { 
            loading: false,
            isPwd: true,
            intendedRoute: '',
            error: null,
            form: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        login() {
            this.intendedRoute = localStorage.getItem('intendedRoute')
            console.log('intendedRoute', this.intendedRoute)

            this.loading = true
            Api.login(this.form)
                .then(response => {
                    this.loading = false
                    if(response.code == 'A'){
                        // commit store mutation
                        this.$store.dispatch('user/login', response)
                        // redirect to intended route
                        this.$router.push({
                            path: this.intendedRoute
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.loading = false
                    // commit store mutation
                    // this.$store.commit('auth/loginFailed', {
                    //   error
                    // })
                })
        }
    }
}
</script>
