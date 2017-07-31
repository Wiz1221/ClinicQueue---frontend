import axios from 'axios';
import { store } from '../index.js';
import { socket } from './ClinicAction';

const loadingQueueError = (error) => {
  return{
    type: "Load_Queue_Error",
    error
  }
}

const storeQueueInClinic = (queue) => {
  return {
    type: "STORE_NEW_QUEUE_IN_CLINIC",
    queue
  }
}

const storeQueueInUser = (queue) => {
  return {
    type: "STORE_NEW_QUEUE_IN_USER",
    queue
  }
}

const storeQueue = (queue) => {
  return {
    type: "STORE_NEW_QUEUE",
    queue
  }
}

export const submitQueue = (pic, queue) => {
  return (dispatch) => {
    console.log(queue)
    console.log(pic)
    // here pic is a file
    let picQueueToBackend = new FormData();
    picQueueToBackend.append('pic', pic);
    picQueueToBackend.append('status', queue.status || "");
    picQueueToBackend.append('comment', queue.comment);
    picQueueToBackend.append('user_id', queue.user_id);
    picQueueToBackend.append('clinic_id', queue.clinic_id);

    axios.post('/queue/', picQueueToBackend)
    .then( (response) => {
      console.log('response', response.data)
      //here pic is a url from cloudinary
      dispatch(storeQueue(response.data));
      dispatch(storeQueueInClinic(response.data));
      dispatch(storeQueueInUser(response.data));
      socket.emit('latestQueueForAllUser', response.data)
    }).catch( (error) =>{
      dispatch(loadingQueueError(error));
    })
  }
}


socket.on('queueForAllUser', (queue) => {
  store.dispatch(storeQueue(queue));
  store.dispatch(storeQueueInClinic(queue));
})
