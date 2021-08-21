<template>
    <div>
        <!-- This example requires Tailwind CSS v2.0+ -->
        <nav class="bg-gray-900">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button-->
                        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <!--
                            Icon when menu is closed.

                            Heroicon name: outline/menu

                            Menu open: "hidden", Menu closed: "block"
                        -->
                        <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <!--
                            Icon when menu is open.

                            Heroicon name: outline/x

                            Menu open: "block", Menu closed: "hidden"
                        -->
                        <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0 flex items-center">
                        <img class="block lg:hidden h-8 w-auto" src="../assets/logo-short.png" alt="Workflow">
                        <img class="hidden lg:block h-8 w-auto" src="../assets/logo-long.png" alt="Workflow">
                        </div>
                        <div class="hidden sm:block sm:ml-6">
                        <div v-if="currentUser" class="flex space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <router-link class="block px-4 py-2 text-sm text-white" :to="{ name : 'home' }">
                                Leave Calendar
                            </router-link>
                            <t-dropdown text="CMS" :toggleOnHover="true">
                                <div class="py-1 rounded-md shadow-xs">
                                    <router-link class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100" :to="{ name : 'report' }">
                                        Leave Reports
                                    </router-link>
                                    <router-link class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100" :to="{ name : 'holiday' }">
                                        Holidays
                                    </router-link>
                                    <router-link class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100" :to="{ name : 'leave-type' }">
                                        Leave Types
                                    </router-link>
                                </div>
                            </t-dropdown>
                        </div>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <!-- Active: "bg-gray-100", Not Active: "" -->
                        <router-link v-if="!currentUser" class="block px-4 py-2 text-sm text-white" :to="{ name : 'login' }">
                            Login
                        </router-link>
                        
                        <a v-else href="#" class="block px-4 py-2 text-sm text-white font-bold" role="menuitem" tabindex="-1" id="user-menu-item-2">{{ currentUser.name }}</a>
                        <a v-if="currentUser" @click="logout()" href="#" class="block px-4 py-2 text-sm text-red-500" role="menuitem" tabindex="-1" id="user-menu-item-2">Logout</a>

                        <router-link v-if="!currentUser" class="block px-4 py-2 text-sm text-white" :to="{ name : 'register' }">
                            Register
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Navbar',
    computed: {
        ...mapGetters('user', {
            currentUser: 'currentUser'
        })
    },
    methods: {
        logout () {
            this.$store.dispatch('user/logout')
            this.$router.push('/login')
        }
    }
}
</script>
