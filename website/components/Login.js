import { Component } from "react";
import Infrastructure from "../infrastructure.json"
import Cookies from 'js-cookie';
import Link from 'next/link'

const subdomain = (Infrastructure.project.value+"."+Infrastructure.domain.value).replace(/\./g,"-")
const redirect_uri_hostname = process.env.NODE_ENV=="development" ? "http://localhost:3000" : `https://${Infrastructure.project.value}.${Infrastructure.domain.value}`
const domain = `${subdomain}.auth.${Infrastructure.region.value}.amazoncognito.com`
const queryParameters = {
    'client_id': Infrastructure.client_id.value,
    'response_type': 'code',
    'scope': 'email+openid+phone+profile',
    'redirect_uri': `${redirect_uri_hostname}/api/callback`
}

export default class Login extends Component {
    render() {
        const token = Cookies.get('token')
        if (token==undefined) {
            const url = `https://${domain}/login?`+Object.keys(queryParameters).map(key => key + '=' + queryParameters[key]).join('&')
            return (<a href={url} className="card">Log in</a>)
        } else {
            return (
                <Link href={{pathname: '/api/logout'}}>
                    <a className="card">Log out</a>
                </Link>
            )
        }
        
    }
}