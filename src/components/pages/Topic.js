import React, { Component } from 'react'
import { Sidenav } from 'materialize-css'
import M from 'materialize-css'
export default class Topic extends Component {
    state = {
        active_id:this.props.match.params.item_id 
    }
    render() {
        return (
            <>
                welcome to topic
                {//Topic Description + title\
                }
                <div className="row topic-items-wrapper">
                <div className="row">hello</div>
                <div className="row">
                <div className="col s12 m8">
                    <TopicItem id={1} /> 
                </div>
                    <div className="col s8 m4 hide-on-small-only">
                    <SideBar items = {1}/>
                </div>
                </div>
                </div>   
            </>
        )
    }
}

class TopicItem extends Component {
    render(){
        return(
        <div>
        <Video />
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
class SideBar extends Component{
    state={
        active : ""
    }
    componentDidMount(){
    }
    render(){
        return(
            <ul class="collection topics-collection scrollable">
                <SideBarItem />
                <SideBarItem />
                <SideBarItem />
                <SideBarItem />
                <SideBarItem />
                <SideBarItem /><SideBarItem />
                <SideBarItem />
                <SideBarItem /><SideBarItem />
                <SideBarItem />
                <SideBarItem /><SideBarItem />
                <SideBarItem />
                <SideBarItem />
            </ul>
        )
    }
}
const SideBarItem = (props) => {
    return(
        <div>
        <li onClick = {(e)=>{e.target.classList= e.target.classList+' active-item'}} class={`collection-item topics-collection-item`}>
            
                <span className="white-text">Alvin</span>
                <span className="white-text secondary-content">
                    <span className="video-time">9:20</span>
                </span>
            
        </li></div>
        
    )
}