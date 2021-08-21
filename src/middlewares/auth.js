export default function auth({ next, router }) {
    // router.beforeEach((to, from, next) => {
    //     // add to intended route if not login route
    //     if (to.name !== 'login') {
    //         localStorage.setItem('intendedRoute', to.path)
    //     }

    //     if (to.matched.some(record => record.meta.requiresAuth)) {
    //         const userStr = localStorage.getItem('user')
    //         if (userStr) {
    //             next()
    //             return
    //         }
    //         console.log('go to login')
    //         next('/login')
    //     } else {
    //         next()
    //     }
    // })
    if (!localStorage.getItem('authToken')) {
        return router.push({
            name: 'login'
        });
    }

    return next();
}