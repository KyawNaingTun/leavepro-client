<template>
    <div class="flex items-center justify-center">
        <div class="w-full max-w-md pt-40">
            <form class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                <!-- @csrf -->
                <div class="text-gray-800 text-2xl flex justify-center py-2 mb-4">
                    Employee Register
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-normal mb-2" for="name">
                        Name
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="name" v-model="form.name" type="text" required autofocus placeholder="Name"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-normal mb-2">
                        Department
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="name" v-model="form.department" type="text" required autofocus placeholder="Department"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-normal mb-2">
                        Role/Designation
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="name" v-model="form.role" type="text" required autofocus placeholder="Role/Designation"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-normal mb-2">
                        Phone
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="name" v-model="form.phone" type="text" required autofocus placeholder="Phone"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-normal mb-2">
                        Email
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="email" v-model="form.email" type="email" required autofocus placeholder="Email" 
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-normal mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        v-model="form.password" type="password" placeholder="Password" name="password" required
                        autocomplete="current-password" 
                    />
                </div>
                <div class="flex items-center justify-between">
                    <button
                        v-if="loading"
                        class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-gray-600 focus:bg-gray-700 cursor-wait"
                        type="button">Loading...
                    </button>
                    <button
                        v-else
                        @click="register()"
                        class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                        type="button">Register
                    </button>
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
                name: '',
                department: '',
                role: '',
                email: '',
                password: ''
            },
        }
    },
    methods: {
        register() {
            this.loading = true
            Api.register(this.form)
                .then(response => {
                    this.loading = false
                    console.log('reg', response)
                    this.$router.push({
                        path: '/login'
                    })
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
