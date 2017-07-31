import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { postNewSubscribe } from "../../../../Actions/SubscribeAction";
import { userNotification } from '../../../../Actions/UserAction';
import { clearNotif } from '../../../../Actions/AppAction';

class Subscribe extends Component {
  constructor(props){
    super(props);
    this.state = {
      phoneNumberCorrect: false
    }
  }

  backToClinicInfo = () => {
    this.props.backToClinicInfo()
  }

  phoneNumberCheckBox = () => {
    let toggle = this.state.phoneNumberCorrect? false : true
    this.setState({
      phoneNumberCorrect: toggle
    })
  }

  confirmSubscribe = () => {
    if(this.state.phoneNumberCorrect && this.props.user.contact){
      if(this.props.notification==="Please confirm phone number is correct"){
        this.props.clearNotif();
      }
      let newSubscribe = {}
      newSubscribe.user = this.props.user;
      newSubscribe.clinic = this.props.clinic;
      this.props.postNewSubscribe(newSubscribe)
    }else{
      this.props.userNotification("Please confirm phone number is correct");
    }
  }

  render() {
    return (
      <div className="subscribeForm">
        <div>We will be sending you SMS with regards to the latest queue situation posted by the Clinic staff</div>
        <div>Please confirm that your phone number is correct</div>
        <div>{this.props.user.contact ? this.props.user.contact : "you have not entered any contact info"}</div>
        <div className="checkbox" >
          <label><input type="checkbox" value="" onClick={this.phoneNumberCheckBox}/> this is correct</label>
        </div>
        <Link to="/account"><button type="submit" className="btn btn-primary">Update My Phone Number</button></Link>
        {
          this.props.user.contact ?
          <button type="submit" className="btn btn-primary queueButton" onClick={this.confirmSubscribe}>Confirm Subscription</button>
          : null
        }
        <button type="submit" className="btn btn-danger queueButton" onClick={this.backToClinicInfo}>back</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic,
    user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userNotification: (message) => {dispatch(userNotification(message));},
    clearNotif: () => {dispatch(clearNotif());},
    postNewSubscribe: (newSubscribe) => {dispatch(postNewSubscribe(newSubscribe));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
