import React, { Component } from 'react'
import { Sidenav } from 'materialize-css'
import M from 'materialize-css'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'

export default class Topic extends Component {
    state = {
        active_id:this.props.match.params.itemid,
        items:[1,2,3,4,5,6,7,8,9,10,11,12],
    }
    componentDidMount(){
        
    }
    activate_id = (id) => {
        var target = document.getElementById(`topic-tab-${id}`)
        var prev = document.getElementById(`topic-tab-${this.state.active_id}`)

        prev.classList.remove('active-item')
        target.classList.add('active-item')

        this.setState({
            active_id:id,
        })
        console.log("ACTIVE:",this.state.active_id)
    }
    collapse = (e,id) => {
        
        var content = document.getElementById(id)
        if (content){
            if (content.style.maxHeight) {
                e.target.style.transform = "rotate(0deg)";
                content.style.maxHeight = null;
            }
            else {
                e.target.style.transform = "rotate(180deg)";
                content.style.maxHeight = content.scrollHeight + "px";
               
            }
        }
        
    }
    addComment = () => {
        return;
    }
    render() { 
        return (
            <div>
                <div className="row topic-items-wrapper">
                <br/>
                <div className="row topic-details">
                    <div className="row">
                    <h4 className = " white-text topic-title-vid">Learn react redux as you go<a onClick={(e) => this.collapse(e,'topic-description')} className="collapse-button"><i className="white-text material-icons">expand_more</i></a></h4>
                    </div>
                    <div id = 'topic-description' className="row collapsible-content white-text">
                       <p>hello bros its me again</p>
                    </div>
                </div>                
                
                <div className="row">
                <div className="col s12 m8">
                    <div className="row">
                    <TopicItem id={this.state.active_id} collapse = {this.collapse} /></div>
                  
                </div>
                    <div className="col s8 push-s2 push-m0 m4">
                            <SideBar activate_id = {this.activate_id} active = {this.state.active_id} items = {this.state.items} />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12 m8">
                        <Comments count = {4} list = {[{author:'gary',timestamp:'10:00am',content:'hey nice course',photoURL:'zaio_logo_2.png',replies:[
                            {author:'hary',timestamp:'11:00am',content:'hey nice course',photoURL:'zaio_logo_2.png'},
                            {author:'george',timestamp:'11:00am',content:'hey i like it',photoURL:'zaio_logo_2.png'},
                            {author:'moice',timestamp:'12:00am',content:'hey nice course',photoURL:'zaio_logo_2.png'},
                        ]},{author:'gary',timestamp:'10:00am',content:'hey nice course',photoURL:'zaio_logo_2.png',replies:[
                            {author:'hary',timestamp:'11:00am',content:'hey nice course',photoURL:'zaio_logo_2.png'},
                            {author:'george',timestamp:'11:00am',content:'hey i like it',photoURL:'zaio_logo_2.png'},
                            {author:'moice',timestamp:'12:00am',content:'hey nice course',photoURL:'zaio_logo_2.png'},
                        ]}]} addComment = {this.addComment} /> 
                    </div>
                </div>
            </div>
        )
    }
}
class Comments extends Component{
    showReplies = (id) => {
        var target = document.getElementById(`reply-${id}`)
        target.classList.toggle("hide");
    }
    render(){
        return(
        <div className="text-sync topic-comments col s12">
        
        <h6 className="blue-underline">{this.props.count} Comments</h6><br/>
        <div className="input-field-comment">
            <input type="text" placeholder = "Post a public comment.."></input>
        </div>
                {
                    this.props.list.map((comment,idx) => {
                        return(
                            
                           <div className="row main-comment">
                                <Comment {...comment} />
                                <div><a onClick = {(e)=>{this.showReplies(idx)}}>show replies</a></div>
                                <div id={`reply-${idx}`} className={`col hide`}>
                                    {
                                        comment.replies.map((reply)=>{
                                            return(
                                                <div className="reply">
                                                <Comment {...reply}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                           </div>      
                        )
                    })
                }
        </div>
        )}
}

class Comment extends Component{
    state = {
        reply:"hide"
    }
    allowReply = () => {
        this.setState({
            reply:"",
        })
    }
    removeReply = () => {
        this.setState({
            reply:"hide"
        })
    }
    render(){
        return(
        <div className="comment">
            <span></span>
            <span><b>{this.props.author}</b> said @{this.props.timestamp}</span><br/>
            <span className="comment-content">{this.props.content}</span> 
            <span><a onClick= {this.allowReply}>REPLY</a></span>
            <div className={`${this.state.reply} input-field-comment`}>
                
                <input type="text" placeholder = "Post a public comment.."></input>
                <a className = "secondary-content prefix" onClick= {this.removeReply}>X</a>
            </div>

        </div>)
    }
}

class TopicItem extends Component {
    render(){
        return(
        <>
        <Video />
        <div className="row">
                <div className="white-text topic-description col m8 s12">
                <div className="row">
                    <h5 className="blue-underline">Fundamentals of react redux title {this.props.id} he <a onClick={(e) => this.props.collapse(e,'video-description')} className="secondary-content collapse-button"><i className="white-text material-icons">expand_more</i></a></h5><br/>
                    </div>
                    <div id = 'video-description' className="row collapsible-content white-text">
                       <p>hello bros its me again</p>
                    </div>
                </div>
                </div> 
        </>
        )
    }
}

class Video extends Component{
    render(){
        return(
        <div className="video-container">
        <video class="responsive-video vertical-center" width="100%" controls>
            <source src="movie.mp4" type="video/mp4" />
        </video></div>
        )
    }
}
class SideBar extends Component{
    state={
        active : this.props.active
    }
    componentDidMount(){
    }
    render(){
        return(<>
            <ul class="collection topics-collection with-header scrollable">
                {
                    this.props.items.map((id)=>{
                        return(
                            <SideBarItem activate_id= {this.props.activate_id} id ={id}  />
                        )
                    })
                    
                }   
            </ul>
            </>
        )
    }
}
const SideBarItem = (props) => {
    return(
        <NavLink to = {`${routes.topicitem}/23/${props.id}`}>
        <li id = {`topic-tab-${props.id}`} onClick = {(e)=>{props.activate_id(props.id)}} className={`collection-item topics-collection-item`}>
            
            <span className="white-text">topic - {props.id}</span>
                <span className="white-text secondary-content">
                    <span className="video-time">9:20</span>
                </span>
            
        </li></NavLink>
        
    )
}