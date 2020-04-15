import Cookies from 'js-cookie';
import Infrastructure from '../infrastructure.json'
export default () => {
    let token
    try {
        token = JSON.parse(Cookies.get('token'))
    } catch {
        token = {
            access_token: "",
            id_token: "",
            refresh_token: "",
            expires_in: "",
            token_type: ""
        }
    }
    let info = []
    Object.keys(token).map(k=>info.push({
        "k": k,
        "v": token[k],
        "source": "Token Cookie"
    }))
    Object.keys(Infrastructure).map(k=>info.push({
        "k": k,
        "v": JSON.stringify(Infrastructure[k].value),
        "source": "/infrastructure.json"
    }))
    return (
    <table border="1px;black">
        {info.map(post => (
        <tr key={post.k}><td>{post.k}</td><td>{post.v}</td><td>{post.source}</td></tr>
      ))}
    </table>)
}