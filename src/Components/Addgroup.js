import React, { Component } from 'react'
import axios from 'axios'

class Addgroup extends Component {
    constructor(props) {
        super(props);
        this.token = localStorage.getItem("access_token")
        this.state = {
            groupname : ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        // console.log('Add')
        e.preventDefault();

        var yourConfig = {
            headers: {
               Authorization: "JWT " + this.token
            }
         }
        // const user = {
        //     group : '/' + this.state.groupname
        // };
        console.log('Add')
        axios.post('/group/' + this.state.groupname, yourConfig)
            .then(response => {this.props.history.push(`/groups`)})
            .catch(error => console.log(error));
        
    }

    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <p>
                        Group Name: 
                    </p>
                    <input type="text" name="groupname" placeholder="Add Group" value={this.state.groupname}
                                    onChange={this.onChange} required/>
                    <button type="submit" onSubmit={this.onSubmit}>
                        Add
                    </button>
                </form>
            </div>
        ) 
    }
}

export default Addgroup;