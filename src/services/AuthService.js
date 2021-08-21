export default{
    getLoggedinUser () {
        const userStr = localStorage.getItem('user')
        console.log('local user', userStr)
        if (!userStr) {
            return null
        }
        console.log('local user not found', userStr)
        // return userStr;
        return JSON.parse(userStr)
    }
}