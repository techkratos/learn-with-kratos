import React from 'react'
import routes from '../../routes'
import M from 'materialize-css'
export default function Navbar() {
    return (
        <nav className="transparent z-depth-0">
            <div className ="nav-wrapper">
            <img src = "/img/zaio_logo_2.png" className = "circle logo-image" />
                <a href={routes.content} className ="brand-logo heading-color hide-on-med-and-down"> Learn with Kratos.</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><SignedOutLinks/></li>  
                    <li><SignedInLinks/></li>
                </ul>
            </div>
        </nav>
    )
}

const SignedOutLinks = () => {
    return(
        <li><button className = "action-btn btn waves-effect"><span>Sign In</span></button></li>
    )
}

const SignedInLinks = () => {
    return (
        <li><HeaderProfile /></li>
    )
}

class HeaderProfile extends React.Component {
    state = {
        mode:"light"
    }
    componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.dropdown-trigger');
            var instances = M.Dropdown.init(elems);
          });
    }
    handleMode = () => {
        var mode,color1,color2,color3;
        if (this.state.mode == "light"){
            mode = "dark"
            color1 = 'var(--background-color-dark)';
            color2 = 'var(--text-color-main-dark)';
            color3 = 'var(--text-color-secondary-dark)'
            
        }
        else{
            mode = "light"
            color1 = 'var(--background-color-light)';
            color2 = 'var(--text-color-main-light)';
            color3 = 'var(--text-color-secondary-light)';
        }
        this.setState({
            mode
        });
        var css = document.body.style;
        css.setProperty('--background-color',color1);
        css.setProperty('--text-color-main',color2);
        css.setProperty('--text-color-secondary',color3);
        console.log(color1,color2,color3)
    }
    render(){
    return (
    <>
        <div className="profile-dp"><img data-target='dropdown1' src = "/img/zaio_logo_2.png" className = "dropdown-trigger circle logo-image" /></div>
        <ul id='dropdown1' className ='center dropdown-content'>
            <li><a href="#!">X </a></li>
            <li class="divider" tabindex="-1"></li>
            <li><a href="#!" onClick ={this.handleMode}>{this.state.mode} mode</a></li>
            <li class="divider" tabindex="-1"></li>
            <li><a href="#" className='center'><button href="#!" className = "secondary-action-btn btn">Log out</button></a></li>
            
        </ul>
    </>
    )
}
}