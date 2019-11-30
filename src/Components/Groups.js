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
        <Link to="/addgroup">addgroup</Link>
        <div>
          {
            this.state.Groups.map((info, index) => <div key={index}>
              <p><span>Name: </span>{info.name}</p>
                { <p>
                  <span>Posts: </span>{info.posts.map((post, index) => <div key={index}>
                    <p>{post}</p>
                  </div>)}
                  </p> 
                }
            </div>)
          }
        </div>
      </div>
    )
  }
}

export default Groups;