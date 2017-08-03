

const ClinicReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_CLINIC':
      return action.clinic || []
      break;
    case 'STORE_NEW_QUEUE_IN_CLINIC':
      return state.map((clinic,index) => {
        if(clinic._id == action.queue.clinic){
          let newQueueArray = [...clinic.queue];
          newQueueArray.unshift(action.queue);
          clinic.queue = newQueueArray
        }
        return clinic
      })
      break;
    case 'STORE_SUBSCRIBE_IN_CLINIC':
      return state.map((clinic,index) => {
        if(clinic._id === action.clinic_id){
          let newSubscribeArray = {...clinic}.subscribe
          newSubscribeArray.push(action.newSubscribe);
          clinic.subscribe = newSubscribeArray
        }
        return clinic
      })
      break;
    case 'DELETE_QUEUE_IN_CLINIC':
      return state.map((clinic,index) => {
        if(clinic._id === action.clinic_id){
          clinic.queue = {...clinic}.queue.filter((queue,index) => {
            return queue._id !== action.queue_id
          })
        }
        return clinic
      })
      break;
    case 'DELETE_SUBSCRIBE_IN_CLINIC':
      return state.map((clinic,index) => {
        if(clinic._id === action.subscribeInfo.clinic_id){
          clinic.subscribe = {...clinic}.subscribe.filter((subscribe,index) => {
            return subscribe._id !== action.subscribeInfo.subscribe_id
          })
        }
        return clinic
      })
      break;
    default:
      return state
  }
}

export default ClinicReducer;
