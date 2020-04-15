import Cookies from 'js-cookie';

export default () => {
    try {
        JSON.parse(Cookies.get('token')).access_token
    } catch {
        return false
    }
    return true
}