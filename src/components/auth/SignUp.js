import React, { Component } from 'react'
import routes from '../../routes'
import OtherAuthMethods from './OtherAuthMethods'
class SignUp extends Component {
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
                <SignUpForm />
            </div>
            </div>
            
        )
    }
}


function SignUpForm() {
    return (
        <div className = "auth-form card">
             <form>
                 <div className="row">
                    <h5>
                    <a href={routes.landing} className="left grey-text ">X</a>
                        Sign Up
                    </h5>
                    <div className="divider pink"/>
                    <p className="grey-text">You will have to verify your email</p>
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
                                    Sign Up
                                </button>
                            </div>
                        </div>
                        <div className="divider pink"/>
                    </div>
                    </div>
                    
                    
                        <OtherAuthMethods />
                    
                    
                    <p className="action-text"><a href={routes.signin} className="grey-text">I already have an account!</a></p>
                </form>
        </div>
    )
}


export default SignUp

