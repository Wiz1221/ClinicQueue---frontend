import React, { Component } from 'react';

import QueueItem from './QueueItem';

class QueueList extends Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  renderClinicAdminQueueItem = () => {
    let queueArray = this.props.queue;

    if (!this.props.queue) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromAdmin = queueArray.filter((queue,index) => {
        return queue.user.role !== "regularUser"
      })
      return queueFromAdmin.map((queue) => {
        return (
          <QueueItem queue={queue}
                    key={queue._id}
                    id={queue._id}
                     />
        )
      });
    }
  }

  renderUserQueueItem = () => {
    let queueArray = this.props.queue;

    if (!this.props.queue) {
      return  (<div>No Queues yet</div>)
    } else {
      let queueFromUser = queueArray.filter((queue,index) => {
        return queue.user.role === "regularUser" || ""
      })
      return queueFromUser.map((queue) => {
        return (
          <QueueItem queue={queue}
                    key={queue._id}
                    id={queue._id}
                     />
        )
      });
    }
  }

  render() {
    return (
      <div >
        <div>From Clinic
        {this.renderClinicAdminQueueItem()}
        </div>
        <div >
        From User
        {this.renderUserQueueItem()}
        </div>

      </div>
    );
  }
}

export default QueueList;
