import React from 'react'

class Content extends React.Component{
    render(){
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
                    <Topic />
                    <Topic />
                    <Topic />
                    <Topic />
                    <Topic />
                </div>
                </div>
            </div>
        )
    }
}

const Topic = (props) => {
    return(
    
        <div class="col s12 l4 m4">
            
        <div class="card topic-card center">
        <span class="card-title text-sync">Card Title</span>
            <div class="card-image">
            <img src="img/course_1.jpg" />
            
            </div>
            <div class="card-content">
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
            </div>
        </div>
        </div>
        
    
                
    )
}

export default Content