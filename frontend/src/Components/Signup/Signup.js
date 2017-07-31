import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../ClinicQueue_White.png';

import { localSignup, userNotification } from '../../Actions/UserAction';
import { clearNotif } from '../../Actions/AppAction';

import DropDownItem from '../NavBar/DropDownItem/DropDownItem';

// import css
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        contact: "",
        role: "regularUser",
        myClinic: ""
      },
      RePassword:"",
      notification: "",
      searchTerm: "",
      clinicDropDownList: [],
      searching: false,
      clinicAdmin: false
    }
  }

  onChange = (e) => {
    let userState = this.state.user;
    let key = e.target.name;
    let value = e.target.value;

    userState[key] = value;
    this.setState(userState);
    console.log(userState);
    this.props.clearNotif();
  }

  onChangeS = (event) => {

    let clinicDropDownList = this.props.clinic.filter((clinic,index) => {
      return clinic.properties.name_full.toLowerCase().includes(event.target.value.toLowerCase());
    })

    clinicDropDownList.sort( (a,b) => {
      const aLower = a.properties.name_full.toLowerCase()
      const bLower = b.properties.name_full.toLowerCase()
      const valueLower = event.target.value.toLowerCase()
      const queryPosA = aLower.indexOf(valueLower)
      const queryPosB = bLower.indexOf(valueLower)
      if (queryPosA !== queryPosB) {
        return queryPosA - queryPosB
      }
      return aLower < bLower ? -1 : 1
    })

    let userState = this.state.user;
    let key = event.target.name;
    let value = event.target.value;

    userState[key] = value;
    this.setState(userState);
    console.log(userState);

    this.setState({
      searchTerm: event.target.value,
      clinicDropDownList: clinicDropDownList,
    });
  }

  localSignup = (e) => {
    console.log(this.state.user.role);
    if (this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.RePassword == "" || this.state.contact == "") {
      console.log(this.props.notification);
      this.props.userNotification("Please enter your details.");
      e.preventDefault();
    } else if (this.state.password == this.state.RePassword){
      this.props.Signup(this.state.user);
    } else {
      console.log(this.props.notification);
      this.props.userNotification("Please enter matching passwords.");
      e.preventDefault();
    }
  }

  enterKeyPress = (e) => {
    if(e.charCode==13){
      if (this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.RePassword == "" || this.state.contact == "") {
        console.log(this.props.notification);
        this.props.userNotification("Please enter your details.");
        e.preventDefault();
      } else if (this.state.password == this.state.RePassword){
        this.props.Signup(this.state.user);
      } else {
        console.log(this.props.notification);
        this.props.userNotification("Please enter matching passwords.");
        e.preventDefault();
      }
    }
  }

  onFocus = () => {
    this.setState({
      searching: true,
      clinicDropDownList: this.props.clinic
    })
  }

  onBlur = () => {
    setTimeout(()=>{
      this.setState({
        searching: false,
        clinicDropDownList: [],
      })
    },200)
  }

  dropDownItemClicked = (clinic) => {
    let userState = this.state.user;
    let key = 'myClinic';
    let value = clinic._id;

    userState[key] = value;
    this.setState(userState);
    console.log(userState);
    this.setState({
      searchTerm: clinic.properties.name_full
    });
  }

  renderDropDown = () => {
    if(this.state.searching){
      return this.state.clinicDropDownList.map((clinic,index) => {
        return (
          <DropDownItem clinic={clinic} onClick={this.dropDownItemClicked} key={clinic._id}/>
        )
      })
    }
  }

  clinicAdmin = () => {
    let userState = this.state.user;
    let key = 'role';

    if(this.state.clinicAdmin) {

      let value = 'regularUser';

      userState[key] = value;
      this.setState(userState);
      console.log(userState);

      this.setState({
        clinicAdmin: false
      });
    } else {
      let value2 = 'clinicAdmin';

      userState[key] = value2;
      this.setState(userState);
      console.log(userState);

      this.setState({
        clinicAdmin: true
      });
    }
  }

  render() {
    return (
      <div className="Signup">
        <div className='LoginForm'>
          {this.props.notification ? <div className='notif'>{this.props.notification}</div> : ""}
          <img src={logo} width={80} height={80} className="logo"/>
          <p className='logoName LogoNameLogin'>Sign up</p>
          <hr/>
          <input type="text" name="username" id="Susername" className='SignupField' placeholder="User Name" onChange={this.onChange}/>
          <input type="email" name="email" id="SSignEmail" className='SignupField' placeholder="Email Address" onChange={this.onChange}/>
          <input type="number" name="contact" id="Scontact" className='SignupField' placeholder="Contact Number" onChange={this.onChange}/>
          <input type="password" name="password" id="Spassword" className='SignupField' placeholder="Password" onChange={this.onChange}/>
          <input type="password" name="RePassword" id="SRePassword" className='SignupField' placeholder="Re-enter Password" onChange={this.onChange} onKeyPress={this.enterKeyPress}/>

          <div className="signWell">
            <div className="checkbox">
              <form>
                <div>
                  <input className="checkBoxInput" type="checkbox" id="check" name="role" defaultValue />
                  <label className="checkBoxLabel" htmlFor="check" onClick={this.clinicAdmin}>
                    <span className="checkBoxSpan">{/* This span is needed to create the "checkbox" element */}</span>Sign up as clinic admin?
                  </label>
                </div>
              </form>
            </div>
            {this.state.clinicAdmin ?
            <div>
            <input className="searchList searchInput"
                   type="search"
                   name="myClinic"
                   id="search"
                   value={this.state.searchTerm ? this.state.searchTerm:""}
                   placeholder="Input Clinic"
                   onChange={this.onChangeS}
                   onFocus={this.onFocus}
                   onBlur={this.onBlur}
                 />
              <p className="signupComments">A member of the team will be in touch with you soon.</p>
               </div>: <div></div> }

                 {this.state.searching?(<div className="dropDownList" >{this.renderDropDown()}</div>): null}
         </div>

          <button className="LoginBtn" onClick={this.localSignup}>Sign up</button>
          <hr/>
          <Link to='/'><button className="SignUpBtn" onClick={this.onChange}>Home</button></Link>
          <Link to='/login'><button className="backBtn" onClick={this.onChange}>Back</button></Link>
          <hr/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    clinic: state.clinic,
    user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getReviewOfUser: (user_id) => { dispatch(getReviewOfUser(user_id))}
    //Login: (credentials) => {dispatch(localLogin(credentials));}
    Signup: (credentials) => {dispatch(localSignup(credentials));},
    userNotification: (message) => {dispatch(userNotification(message));},
    clearNotif: () => {dispatch(clearNotif());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
