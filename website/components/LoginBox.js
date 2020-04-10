import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Link from 'next/link'
import { Component, useContext } from 'react'
import UserContext from './UserContext'

export default function LoginBox() {
        let { user, token } = useContext(UserContext)
        if (user == null || token == null) 
            return "..."
        else if (user) {
            return (
                <a href="/api/logout">
                        Logout {user.nickname}
                </a>
            )
        } else
            return (
                <a href="/api/login">
                    
                        Login
                    
                </a>
            )
}