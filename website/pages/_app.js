import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';

class MyApp extends App {
    state = {
        user: null,
        token: null
    };
    
    async componentDidMount() {
        const token = await fetch('/api/token');
        if (token.ok) {
            const user = await fetch('/api/me');
            this.setState({
                user: user.json(),
                token: token.text()
            });
        } else {
            console.log("User is not logged in")
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <UserContext.Provider value={{ user: this.state.user, token: this.state.token}}>
            <Component {...pageProps} />
            </UserContext.Provider>
        );
    }
}

export default MyApp;