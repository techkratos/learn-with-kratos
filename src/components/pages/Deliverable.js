import React,{Component} from 'react'
import M from 'materialize-css'
import Fireapp from '../../config/firebaseConfig'
import ProgressBar from '../elements/ProgressBar'
/*
Component to address the deliverable.
Consists of two components, submission form and a private comment
*/

export default class Deliverable extends Component{
    render(){
        return(
           <div className="deliverable-container">
               <SubmissionForm topicitem={this.props.topicitem} />
               <PrivateComment  topicitem={this.props.topicitem} />
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
/*
    Submission form allows to submit zip files. 
    An attached progressbar shows the progress of upload.
*/
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
        
        var file = e.target.files[0]
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
                    <span class="card-title blue-underline">Your work<span className = "right">{this.props.topicitem.points} points</span></span>
                    
                    
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