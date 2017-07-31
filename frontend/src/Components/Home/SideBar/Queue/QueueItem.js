import React, { Component } from 'react';

import './QueueItem.css';

class QueueItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.queue);
    return (
      <div className="queueItem">
        <div className="card">
          <div className="card-image">
            <img src={this.props.queue.pic} />
          </div>
              <div className="card-content">
                <div className="card-title">User: Testee</div>
                  <p className="card-text">{this.props.queue.comment}</p>
                  <button className="btn card-btn-block ">Delete</button>
                </div>
              </div>
        </div>
    );
  }


}

export default QueueItem;
