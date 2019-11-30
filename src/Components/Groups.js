import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'


class Groups extends Component {
  constructor(props) {
    super(props)
    this.token = localStorage.getItem("access_token");
    this.state = { 
      Groups: [],
      user_groups : [],
      selectedGroup: ""
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount() {
    var yourConfig = {
        headers: {
           Authorization: "JWT " + this.token
        }
     }
    axios.get('/groups', yourConfig)
            .then(response => {
              // console.log(response.data.groups)
              this.setState({
                Groups: response.data.groups
              })
            })
            .catch(error => console.log(error));
    
    axios.get('/user_groups',yourConfig)
            .then(response => {
              //  console.log(response.data.groups)
                this.setState({
                    user_groups : response.data.groups
                })
                // console.log(this.state.user_groups)
            })
            .catch(error => console.log(error));
    // const myArray = this.state.Groups.filter( ( el ) => !toRemove.includes( el ) );
  }

  onChange(e) {
    // console.log(e.target.value)
    this.setState({
      selectedGroup: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.token)
    var yourConfig = {
        "headers": {
           "Authorization": "JWT " + this.token,
           "Content-Type": "application/json"
        }
     }

    var data = {
      "group_name" : this.state.selectedGroup
    }
    //  console.log(this.state.selectedGroup)
    axios.post('/group_user', data, yourConfig)
            .then(response => {this.props.history.push(`/profile`)})
            .catch(error => console.log(error));
  }

  render() {
    // console.log(this.state.Groups)
    return (
      <div>
        <button><Link to="/creategroup">Create Group</Link></button>
        <form onSubmit={this.onSubmit}>
          <select onChange={this.onChange}>
            <option value="">
              Select a group name 
            </option>
            {
              this.state.Groups.map((info, index) => <option value={info.name} key={index}>
                {info.name}
              </option>)
            }
          </select>
          <button type="submit" onSubmit={this.onSubmit}>Submit</button>
        </form>
        <div>
          {
            this.state.Groups.map((info, index) => <div key={index}>
              <p><span>Group Name: </span>{info.name}</p>
                { <div>
                  <span>Posts: </span>{info.posts.map((post, index) => <div key={index}>
                    <p>Title: {post.title}</p>
                    <p>Text: {post.text}</p>
                  </div>)}
                  </div> 
                }
            </div>)
          }
        </div>
      </div>
    )
  }
}

export default Groups;