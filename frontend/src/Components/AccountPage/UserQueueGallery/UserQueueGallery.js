import React, {Component} from 'react';
import { connect } from 'react-redux';

import QueueItemInAccount from './QueueItemInAccount';
import { deleteQueue } from '../../../Actions/QueueAction';
import { triggerNotification } from '../../../Actions/AppAction';
import { userNotification } from '../../../Actions/UserAction';

import '../../SeeQueue/QueueGallery/QueueItem.css';

class UserQueueGallery extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     settings: {
  //         dots: true,
  //         infinite: true,
  //         speed: 500,
  //         slidesToShow: 2,
  //         slidesToScroll: 1
  //       }
  //   }
  // }

  deleteQueueButton = (queue) => {
    this.props.deleteQueue({
      queue_id: queue._id,
      queuePicPublicId: queue.picPublicId,
      clinic_id: queue.clinic._id,
      user_id: queue.user._id
    });
    this.props.triggerNotification()
    this.props.userNotification("Successfully deleted queue!")
  }

  renderQueueGallery = () => {
    let queueFromUserArray = [...this.props.queue].filter((queue,index) => {
      return queue.user._id === this.props.user._id;
    })

    if(queueFromUserArray.length===0){
      return (<div>you have not posted any queue</div>);
    }else{
      return queueFromUserArray.reverse().map((queue,index) => {
        return (
            <QueueItemInAccount queue={queue} user={this.props.user} deleteQueueButton={this.deleteQueueButton} key={queue._id}/>
        )
      })
    }
  }

  render() {
    let queue = this.renderQueueGallery();
    return (
      <div className="containerForQueueGallery">
          {queue}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    clinic: state.clinic,
    queue: state.queue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteQueue: (queue) => {dispatch(deleteQueue(queue));},
    triggerNotification: () => {dispatch(triggerNotification());},
    userNotification: (message) => {dispatch(userNotification(message));}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserQueueGallery);
