import React, { Component } from 'react';

import './QueueItem.css';

class QueueItem extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    return (
      <div className="queueItem">
        <img src={this.props.queue.pic} />
        <div>{this.props.queue.comment}</div>
      </div>
    );
  }
}

export default QueueItem;
