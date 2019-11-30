import React, { Component } from 'react'
import axios from 'axios'

class Grouppost extends Component {
    constructor(props) {
        super(props);
        this.token = localStorage.getItem("access_token");
        this.state = {
            group_name : this.props.location.state.id,
            posts: [],
            showForm: false,
            post: '',
            group_id: '',
            title: ''
        }
        this.onChangeForBody = this.onChangeForBody.bind(this)
        this.onChangeForTitle = this.onChangeForTitle.bind(this)
        this.onClick = this.onClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        var yourConfig = {
            headers: {
               Authorization: "JWT " + this.token
            }
        }

        axios.get('/group_posts/' + this.state.group_name, yourConfig)
            .then(response => {
            //   console.log(response.data.post[0].group_id)
              this.setState({
                posts: response.data.post
              })
            //   this.props.history.push(`/grouppost`)
            })
        
        axios.get('/groupid/' + this.state.group_name)
            .then(response => {
            //   console.log(response.data.group_id)
              this.setState({
                group_id: response.data.group_id
              })
            })
            // .catch(error => console.log(error));
    }

    onClick() {
        this.setState({showForm: true})
    }

    onChangeForTitle(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onChangeForBody(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        var yourConfig = {
            "headers": {
               "Authorization": "JWT " + this.token,
               "Content-Type": "application/json"
            },
         }
         var data = {
            "text" : this.state.post,
            "group_id": this.state.group_id
        }

        axios.post('/post/' + this.state.title, data, yourConfig)
            .then(response => {this.props.history.push(`/profile`)})
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                {this.state.posts.map((info, index) => <div key={index}>
                    {console.log(info)}
                    <p>Post Title : {info.title}</p>
                    <p>Post text: {info.text}</p>
                </div>)}
                <div>
                    <button type="submit" onClick={this.onClick}>Add Post</button>
                    {(this.state.showForm) ? 
                    <form onSubmit={this.onSubmit}>
                        <p>Post Title</p>
                        <input type="text" name="title" value={this.state.title} onChange={this.onChangeForTitle} placeholder="Title" required/>
                        <p>Post Body</p>
                        <input type="text" name="post" value={this.state.post} onChange={this.onChangeForBody} placeholder="Type" required/>
                        <button type="submit" onSubmit={this.onSubmit}>Submit</button>
                    </form>
                    : ''}
                </div>  
            </div>
        )
    }
}

export default Grouppost;