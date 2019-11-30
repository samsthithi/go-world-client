import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/auth', user)
            .then(response => {
                // console.log(response)
                // alert(response.data.access_token)
                localStorage.setItem("access_token",response.data.access_token);
                this.props.history.push(`/profile`)
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="username">username</label>
                                <input type="username"
                                    className="form-control"
                                    name="username"
                                    placeholder="Enter username"
                                    value={this.state.username}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password </label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block" onSubmit={this.onSubmit}>
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;