import React, { Component } from 'react';
import {cuttingCommentShort, dateParse, queueBorderParse, queueClassParse} from '../../../API/API'

import './QueueItem.css';

class QueueItem extends Component {

  render() {
    const queue = this.props.queue;
    return (
      <div >
        {queue.user.role =="clinicAdmin" && queue.user.myClinic === this.props.activeClinic._id?
        (<div className={"queueItem "+ queueBorderParse(queue.status) + " container"}>
          <img src={queue.pic} className="queue-image"/>
          <p className="queue-timestamp">Submitted at {dateParse(queue.createdAt,8)}</p>
          <p className="queue-comments">"{queue.comment}"</p>

            <p>Queue status:</p>
            <div className={"queue-status "+ queueClassParse(queue.status)}>{queue.status}</div>

        </div>) : (
        <div className="queueItem container">
          <img src={queue.pic} className="queue-image"/>
          <p className="queue-timestamp">Submitted at {dateParse(queue.createdAt,8)}</p>
          <p className= "queue-user">by @{queue.user.username}</p>
          <p className="queue-comments">"{queue.comment}"</p>
        </div> )}
      </div> )
  }
}

export default QueueItem;
