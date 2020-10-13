import React, { Component, Fragment } from 'react'
import './android.css'

class Android extends Component {
    render() {
        return (
            <Fragment>
                <main role="main" className="inner cover">
                    <h1 className="cover-heading">Simpel App.</h1>
                    <p className="lead">Download Aplikasi Simpel berbasis Android kami di Smartphone Anda !</p>
                    <p className="lead">
                    <button type="button" className="btn btn-outline-light m-2"><a href={process.env.PUBLIC_URL + "/simpel.rar"} download="simpel.rar">Download</a></button>
                    </p>
                </main>
            </Fragment>
        )
    }
}

export default Android
