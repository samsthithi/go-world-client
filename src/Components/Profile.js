import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './style.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.token = localStorage.getItem("access_token")
        this.state = {
            username: '',
            groups: [],
            group_name: '',
            redirect: false
        }

        this.onClick = this.onClick.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        // console.log(this.props)
        var yourConfig = {
            headers: {
               Authorization: "JWT " + this.token
            }
         }
        // console.log(this.token)
        // console.log("Mohit")
        axios.get('/profile',yourConfig)
            .then(response => {
            //    console.log(response.data)
                this.setState({
                    username: response.data.username
                })
            })
            .catch(error => console.log(error));

        axios.get('/user_groups',yourConfig)
            .then(response => {
            //    console.log(response.data)
                this.setState({
                    groups : response.data.groups
                })
                // console.log(this.state.groups)
            })
            .catch(error => console.log(error));
    }

    onClick(e) {
        // console.log(e.target.value)
        this.setState({
            redirect: true,
            group_name: e.target.value
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={{
                    pathname: '/grouppost',
                    state: { id: this.state.group_name }
                }}
            />
        }
    }

    render() {
        return (
            <div className="profileColor">
                <div className="container">
                    <div className="jumbotron mt-5">
                        <div className="col-sm-8 mx-auto">
                            <h1 className="text-center">PROFILE</h1>
                        </div>
                        <table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>{this.state.username}</td>
                                </tr>
                                <tr>
                                    <td>User Groups</td>
                                    <td>{this.state.groups.map((group, index) => <div key={index}>
                                        {this.renderRedirect()}
                                        <button value={group} onClick={this.onClick}>{group}
                                        </button>
                                    </div>)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;