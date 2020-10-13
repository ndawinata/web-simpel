import React, { Component, Fragment } from 'react'
import './about.css'

class About extends Component {
    render() {
        return (
            <Fragment>
                <main role="main" className="inner cover">
                    <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="simpel" width="75%" />
                </main>
            </Fragment>
        )
    }
}

export default About
