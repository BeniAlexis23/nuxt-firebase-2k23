import { useFirebaseAuth } from '../composables/useFirebaseAuth';
export default defineNuxtRouteMiddleware(async (to, from) => {

    const { currentUserPromise } = useFirebaseAuth();
    const user = await currentUserPromise();

    if (!user && to.path !== '/login') {
        return navigateTo('/login')
    }
});
