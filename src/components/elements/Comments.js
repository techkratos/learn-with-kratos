import React,{Component} from 'react'
import Fireapp from '../../config/firebaseConfig'
import firebase from 'firebase'
export default class Comments extends Component{
    state = {
        comment:'',
        items:this.props.list,
        comments : this.props.list.comments,
        count:this.props.count
    }
    syncDb = (replies,idx)=>{
        var comments = this.state.comments       
        console.log(comments)
        comments[idx].replies = replies
        this.setState({comments})
        const db = Fireapp.firestore()
        db.collection("items").doc(this.props.itemid).update({
            comments:comments
        }).then(()=>{

            console.log('success')
        }).catch((err)=>console.log("YOU SCREWED UP"))
    }
    onChange = (e) => {
        this.setState({
            comment:e.target.value
        })

    }
    addComment = () =>{
        var comments = this.state.comments
        const user = Fireapp.auth().currentUser
        var newcomment = {
            'author' : (user.displayName)?(user.displayName):user.email,
            'displayURL':(user.displayURL)?(user.displayURL):'',
            'content':this.state.comment,
            'timestamp':firebase.firestore.Timestamp.fromDate(new Date()),
            'replies':[]
        }
        comments.push(newcomment)
        this.setState({
            comments,
            comment:'',
            count:this.state.count+1
        })
        const db = Fireapp.firestore()
        db.collection("items").doc(this.props.itemid).update({
            comments:this.state.comments
        }).then(()=>{
            console.log('successagain')
        }).catch((err)=>console.log("YOU SCREWED UP"))
    }
    render(){
        
        return(
        <div className="text-sync topic-comments col s12">
        
            <h6 className="blue-underline remove-margin-left">{this.state.count} Comments</h6><br/>
            <div className="row">
            <div className="remove-margin-left  your-comment card input-field-comment">
                <input type="text" onChange ={this.onChange} value={this.state.comment} placeholder = "Post a public comment.."></input>
               <a className = "btn secondary-action-btn" onClick={this.addComment}>POST</a>
            </div>
            </div>
            <div className="divider text-sync"></div>
            <br/>
                {
                    this.state.comments.map((comment,idx) => {
                        
                        return(
                        <div>
                             <MainComment key={idx} {...comment}  syncDb= {this.syncDb} idx  = {idx} />
                        </div>
                         )
                    })
                }
        </div>
        )}
}

class MainComment extends Component{
    state = {
        replyState : "show",
        replies: this.props.replies,
        reply:''
    }
    showReplies = (id) => {
        var target = document.getElementById(`reply-${id}`)
        target.classList.toggle("hide");
        if (this.state.replyState == "show")
        {
            this.setState({replyState:"hide"})
        }
        else{
            this.setState({replyState:"show"})
        }
    }
    ondateChange = (e) =>{
        this.setState({
            reply:e.target.value
        })
    }
    addReply = (e) => {
        var c = this.state.replies
        const user = Fireapp.auth().currentUser
        var reply = {
            'author' : user.email,
            'displayURL':(user.displayURL)?(user.displayURL):'',
            'content':this.state.reply,
            'timestamp':firebase.firestore.Timestamp.fromDate(new Date())
        }
        c.push(reply)
        this.setState({
            replies:c,
            reply:''
        })
        this.props.syncDb(this.state.replies,this.props.idx)
    }
    activate_reply(idx){
        var target = document.getElementById(`${idx}-comment-reply`)
        target.classList.toggle('hide')
        
        
    }
    render()
    {   
        console.log("inside maincomment ")
        const {idx} = this.props
        return(
            <div className="row main-comment">
                <div className = "row remove-extra-margin black-text">
                    <Comment {...this.props} activate_reply = {() => {this.activate_reply(idx)}} />
                    <div><a onClick = {(e)=>{this.showReplies(idx)}}>{this.state.replyState} replies</a></div>
                    <div id={`reply-${idx}`} className={`col hide`}>
                        {
                            this.state.replies.map((reply,i)=>{
                                return(
                                    <div className="reply row">
                                    <Comment key={i} idx = {idx} activate_reply = {() => {this.activate_reply(idx)}} {...reply}/>
                                    
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    </div>
                    <div id = {`${idx}-comment-reply`} className={`hide row reply-comment input-field-comment`}>   
                        <div className="col s8">
                        <input onChange = {this.ondateChange} value = {this.state.reply} type="text" className="reply-input" placeholder = "Reply..."></input>
                        <a className="btn secondary-action-btn" onClick = {this.addReply}>Post comment</a>
                        </div>
                        <div className="col s1">
                        <span><a className = "x-for-reply" onClick={() => {this.activate_reply(idx)}} >X</a></span>
                        </div>
                    </div>
            </div>
        )
    }
}

class Comment extends Component{
    render(){
        
        return(
            <div className="comment">
            <span></span>
        <span><b>{this.props.author}</b> said @{String(this.props.timestamp.toDate())}</span><br/>
            <span className="comment-content">{this.props.content}</span> 
            <span><a href={`#${this.props.idx}-comment-reply`} onClick= {this.props.activate_reply} className = "reply-ui text-sync-primary">REPLY</a></span>
            

        </div>
        )
    }
}