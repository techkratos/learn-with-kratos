import React,{Component} from 'react'
import Fireapp from '../../config/firebaseConfig'
import firebase from 'firebase'
import {useHistory, Redirect} from 'react-router-dom'
import routes from '../../routes'
class OtherAuthMethods extends Component {
    state = {
        user:"",
        errorMessage:"",
        redirect:''
    }
    
    googleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        Fireapp.auth().signInWithPopup(provider)
            .then((result) => {
                console.log("HERE")
                var token = result.credential.accessToken;
                var user = result.user;
                console.log(user)
                this.setState({
                    user:user.displayName,
                    errorMessage:"",
                    redirect:routes.content
                })
                console.log(user)
                // Redirect to content
                
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                this.setState({
                    errorMessage,
                    user:""
                })
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                
            });
    }
    githubSignIn = () => {
        var provider = new firebase.auth.GithubAuthProvider();
        Fireapp.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            this.setState({
                user:user.displayName,
                errorMessage:"",
                redirect:routes.content
            })
            
            
            
            // ...
          }).catch((error)=> {
            // Handle Errors here.
            
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            this.setState({
                errorMessage,
                user:""
            })
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    render(){
        if(this.state.redirect)
            return(<Redirect to = {this.state.redirect}/>)
        else{
        return(
            <div className="row center">
                <div className="heading">or sign in with</div>
                <br/>
                <div className = "other-auth-methods">
                    <span className="auth-logo" onClick={this.googleSignIn}><img src = "https://i.pinimg.com/originals/39/21/6d/39216d73519bca962bd4a01f3e8f4a4b.png" className = "circle logo-image" /></span>
                    <span className="auth-logo" onClick={this.githubSignIn}><img src = "https://pngimg.com/uploads/github/github_PNG40.png" className = "circle logo-image" /></span>
                </div>
                {this.state.user? `Hello ${this.state.user}!`: '' }
                {this.state.errorMessage?this.state.errorMessage:''}
            </div>
        )
    }}
}
export default OtherAuthMethods
