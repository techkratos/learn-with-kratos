import React, { Component } from 'react'
import { Sidenav } from 'materialize-css'
import M from 'materialize-css'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'
import Comments from '../elements/Comments'
import ProgressBar from '../elements/ProgressBar'
import Fireapp from '../../config/firebaseConfig'


export default class Topic extends Component {
    constructor(){
        const db = Fireapp.firestore()
        db.collection("topics").doc(this.state.topicid).get().then((doc)=>{
            var x = doc.data()
            this.state = {
                active_id:this.props.match.params.itemid,
                topicid:this.props.match.params.topicid,
                topic:x,
                items:x.items,
                loading:true,
                activeItem:comments
            } 
            var items = [];
            var i;
            
            

        }).catch((err)=>{
            console.log(err)    
        })
    }
        
    componentDidMount(){
        const db = Fireapp.firestore()
        
        
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
                    <h4 className = " white-text topic-title-vid">Learn react redux as you go
                        <a onClick={(e) => this.collapse(e,'topic-description')} className="collapse-button"><i className="white-text material-icons">expand_more</i></a></h4>
                    </div>
                    <div id = 'topic-description' className="row collapsible-content white-text">
                       <p>hello bros its me again</p>
                    </div>
                </div>                
                
                <div className="row">
                <div className="col s12 m8">
                    <div className="row">
                    <TopicItem type="video" id={this.state.active_id} collapse = {this.collapse} /></div>
                  
                </div>
                    <div className="col s8 push-s2 push-m0 m4">
                            <SideBar activate_id = {this.activate_id} active = {this.state.active_id} items = {this.state.items} />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12 m10">
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



class TopicItem extends Component {
    render(){
        const {type} = this.props
        return(
        <>
            {
                (type=="video")?<Video />:''
            }
            <TopicItemDescription collapse = {this.props.collapse}/>
            {
                (type=="deliverable")?<Deliverable/>:''
            }
        </>
        )
    }
}

class TopicItemDescription extends Component{
    render(){
        return(
        <div className="row">
                <div className="white-text topic-description col s12">
                <div className="row">
                    <h5 className="blue-underline">Fundamentals of react redux title {this.props.id} he <a onClick={(e) => this.props.collapse(e,'video-description')} className="secondary-content collapse-button"><i className="white-text material-icons">expand_more</i></a></h5><br/>
                    </div>
                    <div id = 'video-description' className="row collapsible-content white-text">
                       <p>hello bros its me again</p>
                    </div>
                </div>
                </div> 
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

class Deliverable extends Component{
    render(){
        return(
            
           <div className="deliverable-container">
               <SubmissionForm />
               <PrivateComment />
           </div>     
        )
    }
}

class PrivateComment extends Component{
    state = {
        content:''
    }
    onChange = (e) => {
        this.setState({
            content:e.target.value
        })
    }
    sendComment = () => {
        var email = Fireapp.auth().currentUser.email
        const db = Fireapp.firestore()
        db.collection("privateComments").add({
            'email':email,
            'comment':this.state.content
        }).then((ref)=>{
            this.setState({
                content:'',
            })
            var toastHTML = '<span>Private comment sent  </span><i class="material-icons">check</i>';
            M.toast({html: toastHTML});
        
        }).catch((err)=>{
            var toastHTML = '<span>Sending private content failed </span><i class="material-icons">X</i>';
            M.toast({html: toastHTML});
        })
    }
    render(){
        return(
            <div class="row">
            <div class="col s11 push-m3 m6">
            <form>
            <div class="card submission-card">
                <div class="card-content white-text">
                <span class="card-title blue-underline">Private Comment</span>
                    <div className="row">   
                    <div class="col s10 input-field private-comment white-text">
                                <input onChange={this.onChange} placeholder="write a private comment" id = "comment_priv" onChange = {this.onChange} type="text"/>
                               
                            </div>
                            <br/>
                    <div className="col s1 send-button">
                       <a onClick={this.sendComment} className="white-text"><i class="material-icons small">send</i></a> 
                    </div>
                    </div>
                    </div>
            </div>
            </form>
        </div>
        </div>
    )
    }
}

class SubmissionForm extends Component{
    state = {
        uploading:false,
        uploadfile:null,
        filename:'',
        progress:0,
        uploadTask:null,
        done:false
    }
    onChange = (e) => {
        console.log("HERE")
        var file = e.target.files[0]
        console.log("HERE")
        if (file){
            const storage = Fireapp.storage();  
           
            const uploadTask = storage.ref(`submissions/${file.name}`).put(file);
            this.setState({
                filename:file.name,
                uploading:true,
                uploadTask:uploadTask
            })
            
            
            uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                console.log(error);
            },
            () => {
                
               
                storage
                .ref("submissions")
                .child(file.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({
                        uploading:false,
                        uploadfile:url
                    });
                });
            }
            );
        }
    }
    onSubmit = () => {
        const db = Fireapp.firestore()
        db.collection('submissions').add({
            'submitted_by':Fireapp.auth().currentUser.displayName,
            'file_url':this.state.uploadfile
        }).then((ref)=>{
            this.setState({
                done:true
            })
            console.log("updated",this.state)
        }).catch((err)=>console.log('error'))
    };
    cancelUpload = () =>{
        this.state.uploadTask.cancel()
        this.setState({
            uploading:false,
            uploadfile:null,
            uploadTask:null
        })
    }
    render(){
        return(
            <div class="row">
                <div class="col s11 push-m3 m6">
                <form>
                <div class="card submission-card">
                    <div class="card-content white-text">
                    <span class="card-title blue-underline">Your work</span>
                    
                    
                        <div className="row">
                            <div class="file-field input-field">

                                <div class="col s12 input-field secondary-action-btn btn">
                                    Add your deliverable
                                    <input id = "assignment" onChange = {this.onChange} type="file"/>
                                </div>
                                
                            </div>
                        </div>
                        <div className="center filename">
                                    <span>
                                        {(this.state.uploading)?'Uploading..':''}
                                        {(this.state.uploadfile)?<i class="material-icons">check</i>:''}
                                        {this.state.filename}
                                    </span>
                                </div>
                    
                        </div>
                    {((this.state.uploading)?<div className="row">
                        <div className="col s12">
                        <ProgressBar progress={this.state.progress}/></div>
                        <div className="center cancel-button"><a onClick={()=>{this.cancelUpload()}}>Cancel</a></div>
                        </div>
                        :'')}
                    
                {   (this.state.uploadfile)?
                        <div class="center card-action">
                            <a onClick={this.onSubmit} className="btn darken-3 green">Mark as completed</a>
                            {
                            (this.state.done)?<i class="white-text material-icons">check</i>:''
                            }
                        </div>
                    :<div class="center card-action">
                        <a  className="disabled btn darken-3 green">Mark as completed</a>
                        
                    </div>
                }
                
                </div>
                </form>
            </div>
            </div>
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