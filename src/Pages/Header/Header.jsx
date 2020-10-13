import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header style={{textAlign:''}} className="masthead mb-auto">
                    <div className="inner">
                        <h3 className="masthead-brand">Simpel</h3>
                        <nav className="nav nav-masthead justify-content-center">
                            <a className={`nav-link ${this.props.status1}`} href="#">Home</a>
                            <a className={`nav-link ${this.props.status2}`} href="/">Android</a>
                            <a className={`nav-link ${this.props.status3}`} href="#">About</a>
                        </nav>
                    </div>
            </header>
        )
    }
}
// href={process.env.PUBLIC_URL + "/simpel.rar"} download={'simpel.rar'}
export default Header
