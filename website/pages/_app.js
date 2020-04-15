import React from 'react';
import App from 'next/app';
import Head from 'next/head'

class MyApp extends App {
    state = {
    };
    
    async componentDidMount() {
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <div>
                <Head>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
                </Head>
                <Component {...pageProps} />
            </div>
        );
    }
}

export default MyApp;