import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';

class MyApp extends App {
    state = {
        user: null,
        token: null
    };
    
    async componentDidMount() {
        const user = await fetch('/api/me');
        if (user.ok) {
            const token = await fetch('/api/token');
            this.setState({
                user: user.json(),
                token: token.text()
            });
        } else {
            this.setState({
                user: false
            })
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