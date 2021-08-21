import VueRouter from 'vue-router'
// Middlewares
import auth from './middlewares/auth'
import log from './middlewares/log'
// Pages
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ReportPage from './pages/ReportPage'
import CalendarPage from './pages/CalendarPage'
import HolidayPage from './pages/HolidayPage'
import LeaveTypePage from './pages/LeaveTypePage'
// Routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: CalendarPage,
        meta: {
            middleware: [auth, log]
        }
    },
    {
        path: '/report',
        name: 'report',
        component: ReportPage,
        meta: {
            middleware: [auth, log]
        }
    },
    {
        path: '/holiday',
        name: 'holiday',
        component: HolidayPage,
        meta: {
            middleware: [auth, log]
        }
    },
    {
        path: '/leave-type',
        name: 'leave-type',
        component: LeaveTypePage,
        meta: {
            middleware: [auth, log]
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: {
            middleware: log
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {
            middleware: log
        }
    },
    // Ex. ADMIN ROUTES
    // {
    //     path: '/path',
    //     name: 'route.name',
    //     component: YourComponenetName,
    //     meta: {
    //         auth: {
    //             roles: 2,
    //             redirect: {
    //                 name: 'login'
    //             },
    //             forbiddenRedirect: '/403'
    //         }
    //     }
    // },
]
const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];

    const context = {
        from,
        next,
        router,
        to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});
    
export default router