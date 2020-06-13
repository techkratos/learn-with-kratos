import React, { Component } from 'react'
import { Sidenav } from 'materialize-css'
import M from 'materialize-css'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'
import Comments from '../elements/Comments'
import ProgressBar from '../elements/ProgressBar'
import Fireapp from '../../config/firebaseConfig'
import Preloader from '../elements/Preloader'


export default class Topic extends Component {
    state = {
        active_id:this.props.match.params.itemid,
        topicid:this.props.match.params.topicid,
        topic:{},
        items:{},
        loading:true
    }
    commentChange = (items)=>{
        this.setState({items})
    }
    componentDidMount(){
        const db = Fireapp.firestore()
        db.collection("topics").doc(this.state.topicid).get().then((doc)=>{
            var topic = doc.data()
            var topicid = doc.id
            var items = {}
            var count = 0;
            console.log(topic)
            topic.items.forEach(async (item)=>{
                await db.collection('items').doc(item).get().then((docx)=>{
                    var x = docx.data()
                    
                    items[docx.id] = x;
                    count++;
                    if(count == topic.items.length){
                        console.log(items,count)
                        this.setState(
                            {
                                items:items,
                                topic:topic,
                                loading:false
                            }
                        )
                        console.log(this.state)
                    }
                })
            })
        }).catch((err)=>{
            console.log(err)    
        })
        
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
        
        if(this.state.loading){return(<Preloader/>)}
        else{
        
        return (
            <div>
                <div className="row topic-items-wrapper">
                <br/>
                <div className="row topic-details">
                    <div className="row">
                    <h4 className = " white-text topic-title-vid">{this.state.topic.title}
                        <a onClick={(e) => this.collapse(e,'topic-description')} className="collapse-button"><i className="white-text material-icons">expand_more</i></a></h4>
                    </div>
                    <div id = 'topic-description' className="row collapsible-content white-text">
                        <p className = "flow-text">{this.state.topic.description}</p>
                    </div>
                </div>                
                <hr />
                <div className="row">
                <div className="col s12 m8">
                    <div className="row">
                    <TopicItem topicitem = {this.state.items[this.state.active_id]} id={this.state.active_id} collapse = {this.collapse} /></div>
                  
                </div>
                    <div className="col s8 push-s2 push-m0 m4">
                            <SideBar  topicid = {this.state.topicid} activate_id = {this.activate_id} active = {this.state.active_id} items = {this.state.items} />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col s12 m10">
                        <Comments commentChange = {this.commentChange}  itemid = {this.state.active_id} count= {this.state.items[this.state.active_id].comments.length} list = {this.state.items[this.state.active_id]} addComment = {this.addComment} /> 
                    </div>
                </div>
            </div>
        )
    }
}
}

class SideBar extends Component{
    state={
        active : this.props.active,
        items: Object.keys(this.props.items)
    }
    componentDidMount(){
        
    }
    render(){
        console.log(Object.values(this.props.items))
        const items = Object.keys(this.props.items)
        items.forEach((item)=>console.log(item))
        return(
            <ul class="collection topics-collection with-header scrollable">
                {
                    this.state.items.map((item)=>{return(
                        <SideBarItem activate_id = {this.props.activate_id} topicid = {this.props.topicid} id = {item} item = {this.props.items[item]}/>
                    )})
                }   
            </ul>
           
        )
    }
}
const SideBarItem = (props) => {
    return(
        <NavLink to = {`${routes.topicitem}/${props.topicid}/${props.id}`}>
        <li id = {`topic-tab-${props.id}`} onClick = {(e)=>{props.activate_id(props.id)}} className={`collection-item topics-collection-item`}>
            
            <span className="white-text">{props.item.title}</span>
                <span className="white-text secondary-content">
                    <span className="video-time">9:20</span>
                </span>
            
        </li></NavLink>
        
    )
}

class TopicItem extends Component {
    render(){
        const {topicitem} = this.props
        return(
        <>
            {
                (topicitem.type=="video")?<><Video topicitem = {topicitem}/><br/><br/></>:''
            }
            
            <TopicItemDescription topicitem = {topicitem} collapse = {this.props.collapse}/>
            {
                (topicitem.type=="deliverable")?<Deliverable topicitem = {topicitem}/>:''
            }
        </>
        )
    }
}

class TopicItemDescription extends Component{
    render(){
        const {topicitem} = this.props;
        return(
        <div className="row">
                <div className="white-text topic-description col s12">
                <div className="row">
                    
                    <h5 className="flow-text blue-underline"> {topicitem.title} <a onClick={(e) => this.props.collapse(e,'video-description')} className="secondary-content collapse-button"><i className="white-text material-icons">expand_more</i></a></h5><br/>
                    </div>
                    <div id = 'video-description' className="row collapsible-content white-text">
                       <p className ="flow-text">{topicitem.description}</p>
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
            <source src={this.props.topicitem.video_url } type="video/mp4" />
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
