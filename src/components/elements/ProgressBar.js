import React,{Component} from 'react'
import PrivateRoute from '../layout/PrivateRoute'

class ProgressBar extends Component {
    getProgress = () =>{
        return this.props.progress
    }
    render()
     {
        const progress = this.getProgress()
        return (
          <div className="container">
            <div className="progressbar-container">
              <div className="progressbar-complete" style={{width: `${progress}%`}}>
              </div>
              <span className="progress-content">{progress}%</span>
            </div>
          </div>
        )
      }
}

export default ProgressBar  