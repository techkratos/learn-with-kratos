import React from 'react'
import Fireapp from '../../config/firebaseConfig'
import Preloader from '../elements/Preloader'
import {useHistory} from 'react-router-dom'
import routes from '../../routes'
class Content extends React.Component{
    state={
        loading:true,
        topics:[]
    }
    componentDidMount(){
        const db = Fireapp.firestore()
        
        db.collection("topics").get().then((doc)=>{
            
            var list_topics = []
            doc.forEach((topic)=>{
                var x = topic.data()
                x['id'] = topic.id
                list_topics.push(x)
            })
            this.setState({
                topics:list_topics,
                loading:false
            })
        }).catch((err)=>{
            console.log(err)    
        })
    }
    render(){
        if(this.state.loading){
            return(<Preloader />)
        }
        else{
        return(
            <div>
                welcome to content
                <div className="row">
                <div className="search-bar col push-m4 m3 s8 push-s2">
                    <div className="input-field">
                    <input type="text" placeholder = "search.."/>
                    
                    </div>
                </div>
                </div>
                <div className="topic-wrapper">
                <div className="row">
                    {this.state.topics.map((topic)=>{
                        return(<Topic {...topic} />)
                    })}
                    
                </div>
                </div>
            </div>
        )
    }
}
}

const Topic = (props) => {
    const img_no = 1+Math.floor(Math.random()*3)
    const history = useHistory()
    const {author,title,description,items,id} = props
    console.log(items)
    return(
    
        <div class="col s12 l4 m4">    
        <div class="card topic-card center" onClick={()=>{history.push(`${routes.topicitem}/${id}/${items[0]}`)}}>
        <span class="card-title text-sync">{title}</span>
            <div class="card-image">
            <img src={`img/course_${img_no}.jpg`} />
            </div>
            <div class="card-content">
            <p>{author}</p>
            </div>
        </div>
        </div>
        
    
                
    )
}

export default Content