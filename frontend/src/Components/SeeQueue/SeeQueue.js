import React, { Component } from 'react';
import { connect } from 'react-redux';

import QueueGallery from './QueueGallery/QueueGallery';
import SubmitQueue from './SubmitQueue/SubmitQueue';

import './SeeQueue.css'

class SeeQueue extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div className="Login">
        <div className="queueGalleryContainer">
          <QueueGallery queue={this.props.activeClinic.queue}/>
        </div>
        <div className="submitQueueContainer">
          <SubmitQueue clinic={this.props.activeClinic}/>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeeQueue);
