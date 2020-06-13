import React, { Component } from 'react'
import { Sidenav } from 'materialize-css'
import M from 'materialize-css'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'
import Comments from '../elements/Comments'
import Fireapp from '../../config/firebaseConfig'
import Preloader from '../elements/Preloader'
import Video from './Video'
import Deliverable from './Deliverable'
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




