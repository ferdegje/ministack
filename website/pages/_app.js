import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';

class MyApp extends App {
    state = {
        user: null,
        token: null
    };
    
    async componentDidMount() {
        fetch('/api/me')
            .then(resp => resp.json())
            .then(data => {
                fetch('/api/token')
                    .then(resp => resp.json())
                    .then(data => {
                        localStorage.setItem('access_token', data.access_token);
                        this.setState({token: data})
                    })
                this.setState({user: data})
            })
            .catch(error => this.setState({user: false}))
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <UserContext.Provider value={{ user: this.state.user, token: this.state.token, dumb: this.state.dumb}}>
            <Component {...pageProps} />
            </UserContext.Provider>
        );
    }
}

export default MyApp;