import React, {Component} from 'react';
import { connect } from 'react-redux';

import PrivateClinicInfo from './ClinicInfo/PrivateClinicInfo';
import PolyClinicInfo from './ClinicInfo/PolyClinicInfo';

import './SideBar.css';

class SideBar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="sideBar">
        { this.props.activeClinic._id ? (
            this.props.activeClinic.properties.type === "Private"? ( <PrivateClinicInfo/> ): (<PolyClinicInfo/>)

          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //user: state.user
    clinic: state.clinic,
    activeClinic: state.activeClinic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
