import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Link from 'next/link'
import auth0 from '../utils/auth0';
import { Component, useContext } from 'react'
import UserContext from './UserContext'

export default function LoginBox() {
        let { user } = useContext(UserContext)
        return user
            ? (
                <Link href="/api/logout">
                    <a>
                        Logout
                    </a>
                </Link>
            )
            : (
                <Link href="/api/login">
                    <a>
                        Login
                    </a>
                </Link>
            )
}