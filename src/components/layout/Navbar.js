import React from 'react'
import routes from '../../routes'
import {useHistory,NavLink} from 'react-router-dom'
import Fireapp from '../../config/firebaseConfig'
import M from 'materialize-css'

export default class Navbar extends React.Component {
    state = {
        links : null
    }
    componentDidMount(){
        Fireapp.auth().onAuthStateChanged((user)=>{
            if (user){
                this.setState({
                    links:<SignedInLinks />
                })
            }   
            else{
                this.setState({
                    links:<SignedOutLinks  />
                })
            } 
            
        })
    }
    render(){
    console.log(this.state)
    return (
        <nav className="transparent z-depth-0">
            <div className ="nav-wrapper">
            <img src = "/img/zaio_logo_2.png" className = "circle logo-image" />
                <a href={routes.content} className ="brand-logo heading-color hide-on-med-and-down"> Learn with Kratos.</a>
                <ul id="nav-mobile" className="right ">
                    {
                        this.state.links
                    }
                    
                </ul>
            </div>
        </nav>
    )
}
}
const SignedOutLinks = (props) => {
    const history = useHistory()
    return(
        <li><button className = "action-btn btn waves-effect" onClick = {()=>history.push(routes.signin)}><span>Get Started</span></button></li>
    )
}

const SignedInLinks = () => {
    return (
        <>
        <li><NavLink to = {routes.content} className ="text-sync">Content</NavLink></li>
        <li><HeaderProfile/></li>
        </>
    )
}

class HeaderProfile extends React.Component {
    state = {
        mode:"light",
        user:Fireapp.auth().currentUser
    }
    componentDidMount(){
        


        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems);
        
    }
    
    handleMode = () => {
        var mode,color1,color2,color3,color4;
        if (this.state.mode == "light"){
            mode = "dark"
            color1 = 'var(--background-color-dark)';
            color2 = 'var(--text-color-main-dark)';
            color3 = 'var(--text-color-secondary-dark)'
            color4 = 'var(--background-secondary-dark)';
        }
        else{
            mode = "light"
            color1 = 'var(--background-color-light)';
            color2 = 'var(--text-color-main-light)';
            color3 = 'var(--text-color-secondary-light)';
            color4 = 'var(--background-secondary-light)';
        }
        this.setState({
            mode
        });
        var css = document.body.style;
        css.setProperty('--background-color',color1);
        css.setProperty('--text-color-main',color2);
        css.setProperty('--text-color-secondary',color3);
        css.setProperty('--background-secondary',color4);
        console.log(color1,color2,color3)
    }
    logout = () => {
        Fireapp.auth().signOut().then((res)=>{
            const history = useHistory()
            history.push(routes.landing)
        }).catch(()=>{
            console.log("erorororororro")
        })
    }
    render(){
    const {user} = this.state
    return (
    <>
        <div className="profile-dp"><img data-target='dropdown1' src = {(user.photoURL)?(user.photoURL):'img/zaio_logo_2.png'} className = "dropdown-trigger circle logo-image" /></div>
        <ul id='dropdown1' className ='center dropdown-content'>
            <li><a href="#!">X </a></li>
            <li class="divider" tabindex="-1"></li>
            <li><a href="#!" onClick ={this.handleMode}>{this.state.mode} mode</a></li>
            <li class="divider" tabindex="-1"></li>
            <li><a href="#" className='center'><button onClick={this.logout} className = "secondary-action-btn btn">Log out</button></a></li>
            
        </ul>
    </>
    )
}
}