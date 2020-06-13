import React,{Component} from 'react'

export default class Comments extends Component{
    
    render(){
        return(
        <div className="text-sync topic-comments col s12">
        
            <h6 className="blue-underline remove-margin-left">{this.props.count} Comments</h6><br/>
            <div className="remove-margin-left your-comment card input-field-comment">
                <input type="text" placeholder = "Post a public comment.."></input>
            </div>
            <div className="divider text-sync"></div>
            <br/>
                {
                    this.props.list.map((comment,idx) => {
                        return(
                             <MainComment comment={comment} idx = {idx} />
                         )
                    })
                }
        </div>
        )}
}

class MainComment extends Component{
    state = {
        replyState : "show"
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
    removeReply(){
        return
    }
    activate_reply(idx){
        var target = document.getElementById(`${idx}-comment-reply`)
        target.classList.toggle('hide')
        
        
    }
    render()
    {
        const {comment,idx} = this.props
        return(
            <div className="row main-comment">
                <div className = "row remove-extra-margin">
                    <Comment idx = {idx} {...comment} activate_reply = {() => {this.activate_reply(idx)}} />
                    <div><a onClick = {(e)=>{this.showReplies(idx)}}>{this.state.replyState} replies</a></div>
                    <div id={`reply-${idx}`} className={`col hide`}>
                        {
                            comment.replies.map((reply)=>{
                                return(
                                    <div className="reply row">
                                    <Comment idx = {idx} activate_reply = {() => {this.activate_reply(idx)}} {...reply}/>
                                    
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    </div>
                    <div id = {`${idx}-comment-reply`} className={`hide row reply-comment input-field-comment`}>   
                        <div className="col s8">
                        <input type="text" className="reply-input" placeholder = "Reply..."></input>
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
            <span><b>{this.props.author}</b> said @{this.props.timestamp}</span><br/>
            <span className="comment-content">{this.props.content}</span> 
            <span><a href={`#${this.props.idx}-comment-reply`} onClick= {this.props.activate_reply} className = "reply-ui text-sync-primary">REPLY</a></span>
            

        </div>)
    }
}