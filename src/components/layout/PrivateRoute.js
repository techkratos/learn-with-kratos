import Fireapp from '../../config/firebaseConfig'
import {Route,Redirect} from 'react-router-dom'
import routes from '../../routes'
import React,{Component} from 'react'
class PrivateRoute extends Component{
    render(){
        const user = Fireapp.auth().currentUser
        if (user){
            return (
                <Route {...this.props} />
            )
        }
        else{
            return (
                <Redirect to = {routes.landing} />
            )
        }
    }
}
export default PrivateRoute