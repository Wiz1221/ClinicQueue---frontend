import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Subscribe from '../Subscribe/Subscribe';
import QueueList from '../Queue/QueueList';


class PrivateClinicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWhichComponent: "",
    }
  }

  onClick = (event) => {
    this.setState({
      showWhichComponent: event.target.id
    })
  }

  backToClinicInfo = () => {
    this.setState({
      showWhichComponent: ""
    })
  }

  render() {
    return (
      <div>
        <h3>{this.props.activeClinic.properties.name_full}</h3>
        {
          this.state.showWhichComponent==="subscribeClinicButton" ?  (
            <Subscribe clinic={this.props.activeClinic} backToClinicInfo={this.backToClinicInfo}/>
          ) : (
            <div>
              <QueueList queue= {this.props.activeClinic.queue}/>
              <Link to="/seeQueue"><button id="subscribeClinicButton" type="submit" className="btn btn-info">See more queues or Submit a queue report</button></Link>
              <button id="subscribeClinicButton" type="submit" className="btn btn-info" onClick={this.onClick}>Subscribe to this Clinic</button>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateClinicInfo);
