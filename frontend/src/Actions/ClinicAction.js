import axios from 'axios';
import { sortingAlgorithm } from '../API/API';


// socket
import io from 'socket.io-client';


// export const socket = io.connect('https://ec2-54-255-153-99.ap-southeast-1.compute.amazonaws.com:443/');
export const socket = io.connect('http://localhost:3001')



const storeClinic = (clinic) => {
  return {
    type: 'STORE_CLINIC',
    clinic
  }
}

const loadingClinicError = (error) => {
  return{
    type: 'LOADING_CLINIC_ERROR',
    error
  }
}

// called when app is first loaded
export const getClinic = () => {
  return (dispatch) => {

    // telling backend to send all clinic info to frontend
    socket.emit('getAllClinic');
    // after receiving all clinic info from backend
    socket.on('allClinic', (clinic) => {

      // sorting the clinics, Polyclinics first then Private Clinic
      sortingAlgorithm(clinic)

      // store clinic info in store
      dispatch(storeClinic(clinic));
    })

  }
}

export const activeClinic = (clinic) => {
  return {
    type: 'ACTIVE_CLINIC',
    clinic

  }
}

export const removeActiveClinic = () => {
  return {
    type: 'REMOVE_ACTIVE_CLINIC'
  }
}
