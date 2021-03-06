import Vuex from 'vuex'

import user from './user'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ( /* { ssrContext } */ ) {
    const Store = new Vuex.Store({
        modules: {
            user,
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEV
    })
    return Store
}