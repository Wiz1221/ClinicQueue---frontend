import React, { Component } from 'react';

class QueueStatus extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onClick = (event) => {
    this.props.onClick(event.target.innerHTML);
  }

  render() {
    return (
      <div>
        <section>
        <div>
          <input type="radio" id="control_01" name="select" value="1" />
          <label for="control_01">

            <p id="statusSelection1" className="statusSelection" onClick={this.onClick}>Light</p>
          </label>
        </div>
        <div>
          <input type="radio" id="control_02" name="select" value="2" />
          <label for="control_02">

            <p id="statusSelection2" className="statusSelection" onClick={this.onClick}>Normal</p>
          </label>
        </div>
        <div>
          <input type="radio" id="control_03" name="select" value="3" />
          <label for="control_03">

            <p id="statusSelection3" className="statusSelection" onClick={this.onClick}>Busy</p>
          </label>
        </div>
        <div>
          <input type="radio" id="control_04" name="select" value="4" disabled/>
          <label for="control_04">
            <p id="statusSelection4" className="statusSelection" onClick={this.onClick}>Very Busy</p>
          </label>
        </div>
        </section>
      </div>
    );
  }
}

export default QueueStatus
