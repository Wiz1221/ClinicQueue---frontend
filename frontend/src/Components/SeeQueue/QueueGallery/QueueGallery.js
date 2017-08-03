import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';

import QueueGalleryForUser from './QueueGalleryForUser';

import QueueItem from './QueueItem';

class QueueGallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null
    }
  }

  renderClinicAdminQueueItem = (queueArray) => {
    // let queueArray = this.props.queue;
    console.log(queueArray)
    if (queueArray.length===0) {
      return  (<div className="NoQueue">No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user._id ?  (queue.user.role === "clinicAdmin" && queue.user.myClinic===this.props.activeClinic._id) : null;
      })
      console.log("queueFromAdmin");
      console.log(queueFromAdmin)
      return queueFromAdmin.map((queue) => {
        return (
          <Carousel.Item>
          <QueueItem queue={queue}
                    activeClinic={this.props.activeClinic}
                    key={queue._id}
                    id={queue._id}/>
                    </Carousel.Item>
        )
      });
    }
  }

 handleSelect = (selectedIndex, e) => {
  this.setState({
  index: selectedIndex,
  direction: e.direction
});
}
  render() {
    // console.log("Repopulated queue array from activeClinic");
    // console.log(this.props.queue);
    let subject = [];
    if(typeof(this.props.queue[0])==="undefined") {
      subject = [];
    } else {
      subject = this.props.queue;
    }
    // console.log("subject");
    // console.log(subject);

    const activeClinic = this.props.activeClinic;

    return (
      <div className="container queueGallery">
        <div className="row">
          <h2>Queue Gallery</h2>
            <h4>by {Object.getOwnPropertyNames(activeClinic).length > 0 ? activeClinic.properties.name_full : null} Admin</h4>
            <div className="row">
              <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect} className='carousel-Container'>
              {this.renderClinicAdminQueueItem(subject)}
              </Carousel>
            </div>
        </div>
        <div className="row">
          <h4>by Users</h4>
          <div className="row">
            <QueueGalleryForUser subject={subject} activeClinic={activeClinic}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clinic: state.clinic,
    activeClinic: state.activeClinic,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // activeClinic: (clinic) => {dispatch(activeClinic(clinic));},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueGallery);
