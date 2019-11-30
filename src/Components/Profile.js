import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {
    constructor() {
        super()
        this.token = localStorage.getItem("access_token")
        this.state = {
            username: '',
            groups: []
        }
    }

    componentDidMount() {
        // console.log(this.props)
        var yourConfig = {
            headers: {
               Authorization: "JWT " + this.token
            }
         }
        console.log(this.token)
        // console.log("Mohit")
        axios.get('/profile',yourConfig)
            .then(response => {
               console.log(response.data)
                this.setState({
                    username: response.data.username
                })
            })
            .catch(error => console.log(error));

        axios.get('/user_groups',yourConfig)
            .then(response => {
               console.log(response.data)
                this.setState({
                    groups : response.data.groups
                })
                console.log(this.state.groups)
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            {/* <tr>
                                <td>First Name</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.last_name}</td>
                            </tr> */}
                            <tr>
                                <td>Username</td>
                                <td>{this.state.username}</td>
                            </tr>
                            <tr>
                                <td>User Groups</td>
                                <td>{this.state.groups.map((group, index) => <div key={index}>
                                    <p>{group}</p>
                                </div>)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile;