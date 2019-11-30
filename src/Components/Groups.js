import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'


class Groups extends Component {
  token = localStorage.getItem("access_token");
  state = { 
    Groups: []
  }
  componentDidMount() {
    var yourConfig = {
        headers: {
           Authorization: "JWT " + this.token
        }
     }
    axios.get('/groups', yourConfig)
            .then(response => {
              console.log(response)
              this.setState({
                Groups: response.data.groups
              })
            })
            .catch(error => console.log(error));
  }

//   createContact(contact) {
//     ContactsAPI.create(contact).then(contact => {
//       this.setState(state => ({
//         contacts: state.contacts.concat([ contact ])
//       }))
//     })
//   }

  render() {
    return (
      <div>
        <button><Link to="/addgroup">Create Group</Link></button>
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