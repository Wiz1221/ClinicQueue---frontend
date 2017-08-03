import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

import QueueItem from './QueueItem';

class QueueGalleryForUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null
    }
  }

  renderUserQueueItem = (queueArray) => {

    // let queueArray = this.props.queue;
    console.log(queueArray)
    if (queueArray.length===0) {
      return  (<div className="NoQueue">No Queues yet</div>)
    } else {
      let queueFromUser = queueArray.filter((queue,index) => {
        return queue.user.myClinic ? queue.user.myClinic !== this.props.activeClinic._id : true
      })
      return queueFromUser.map((queue) => {
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
    return (
          <div>
            <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect} className='carousel-Container'>
            {this.renderUserQueueItem(this.props.subject)}
            </Carousel>
          </div>
    );
  }
}

export default QueueGalleryForUser;
