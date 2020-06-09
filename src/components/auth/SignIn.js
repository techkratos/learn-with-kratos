import React, { Component } from 'react'
import routes from '../../routes'
class SignIn extends Component {
    state = {
        email : '',
        password : '',
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div className="row">
            <div className="container center col m4 s12 push-m4 push-s0">
                <SignInForm />
            </div>
            </div>
            
        )
    }
}


function SignInForm() {
    return (
        <div className = "auth-form card">
             <form>
                 <div className="row">
                    <h5>
                        <a href={routes.landing} className="left grey-text ">X</a>
                        Sign In
                    </h5>
                    <div className="divider pink"/>
                    </div>
                    <br/>
                    <div className="row ">
                        <div className="col s12">
                    <div className=" col s12 m10 push-s0 push-m1 input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id = "email" />
                    </div>
                    
                    
                    <div className="col s12 m10 push-s0 push-m1 input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id = "password"  />
                    </div>
                    
                        <div className="row">
                            <div className="col s10 push-s1 input-field">
                                <button className="action-btn btn">
                                    Sign In
                                </button>
                            </div>
                        </div>
                        <div className="divider pink"/>
                    </div>
                    </div>
                    
                    <div className="row center">
                        <div className="heading">or sign in with</div>
                    <br/>
                        <div className = "other-auth-methods">
                            <span className="auth-logo"><img src = "https://i.pinimg.com/originals/39/21/6d/39216d73519bca962bd4a01f3e8f4a4b.png" className = "circle logo-image" /></span>
                            <span className="auth-logo"><img src = "https://pngimg.com/uploads/github/github_PNG40.png" className = "circle logo-image" /></span>
                        </div>
                    </div>
                    
                    <p className="action-text"><a href={routes.signup} className="grey-text">I don't have an account!</a></p>
                </form>
        </div>
    )
}


export default SignIn
