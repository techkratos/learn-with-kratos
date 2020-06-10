import React, { Component } from 'react'
import routes from '../../routes'
import OtherAuthMethods from './OtherAuthMethods'
import Fireapp from '../../config/firebaseConfig'



class SignIn extends Component {
    state = {
        email : '',
        password : '',
        error:'',
        loading:false
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            loading:true
        })
        Fireapp.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((res)=>{
            this.setState({
                loading:false
            })
            this.props.history.push('/content')
            })
        .catch((err)=>{
            console.log(err)
            this.setState({
                loading:false,
                error:err.code
            })
        })
    }
    render() {
        const {handleChange,handleSubmit} = this
        return (
            <div className="row">
            <div className="container center col m4 s12 push-m4 push-s0">
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
                        <input type="email" id = "email" onChange={handleChange} />
                    </div>
                    
                    
                    <div className="col s12 m10 push-s0 push-m1 input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id = "password"  onChange={handleChange} />
                    </div>
                    
                        <div className="row">
                            <div className="col s10 push-s1 input-field">
                                <button className="action-btn btn" type="button" onClick={handleSubmit}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                        {this.state.loading?'Loading..':''}
                        <div className="divider pink"/>
                    </div>
                    </div>
                    
                    <OtherAuthMethods/>
                    {this.state.error?this.state.error:''}
                    <p className="action-text"><a href={routes.signup} className="grey-text">I don't have an account!</a></p>
                </form>
        </div>
            </div>
            </div>
            
        )
    }
}





export default SignIn
