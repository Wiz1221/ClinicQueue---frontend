import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleLinear, scaleTime, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';
import { min, max } from 'd3-array';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { Link } from 'react-router-dom';

import Subscribe from '../Subscribe/Subscribe';
import QueueList from '../Queue/QueueList';

import { userNotification } from '../../../../Actions/UserAction';
import { clearNotif } from '../../../../Actions/AppAction';

import './PolyClinicInfo.css';

const d3 = require("d3");

class PolyClinicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWhichComponent: "",
    }
  }

  onClick = (event) => {
    if(!this.props.user._id){
      this.props.userNotification("Please Login to Subscribe");
      setTimeout(() => {
        this.props.clearNotif();
      },2000);
      return;
    }
    this.setState({
      showWhichComponent: event.target.id
    })
  }

  backToClinicInfo = () => {
    this.setState({
      showWhichComponent: ""
    })
  }

  // return formatted time data
  dateArrayParser = (queueArray, strip) => {
    const stripMilliSec = (s) => {
     return s.slice(0, -7);
    }
    const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
    return queueArray.map( (d) => {
      let newDate;
      strip ? newDate = parseTime(stripMilliSec(d.date)) : newDate = parseTime(d.date);
      return {
        date: newDate,
        queueQty: d.queueQty
      }});
    }


  // CREATE chart
  doTimeSeries = (historicalQueue, currentQueue, nodeStage) => {
    const node = this.node;

    const data = [{
      id: 'historicalQueue',
      values: historicalQueue
    },
    {
      id: 'currentQueue',
      values: currentQueue
    }];

    const hQ = this.dateArrayParser(historicalQueue, false)
    const cQ = this.dateArrayParser(currentQueue, true);
    console.log(hQ)
    console.log(cQ)
    const margin = {top: 10, right: 10, bottom: 20, left: 10},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    // Scales and axes. Note the inverted domain for the y-scale: bigger is up!
    const x = scaleTime().range([0, width]),
          y = scaleLinear().range([height, 0]),
          xAxis = axisBottom(x).tickFormat(timeFormat('%H')),
          yAxis = axisLeft(y);//.ticks(4).orient("left");

    // A line generator for historicalQueue, for the dark stroke.
    const line = d3.line()
                  .x(function(d) { return x(d.date); })
                  .y(function(d) { return y(d.queueQty); })
                  .curve(d3.curveStepAfter)

    // Compute the minimum and maximum date, and the maximum queue.
    x.domain([hQ[0].date, hQ[hQ.length - 1].date]);
    //y.domain([0,max(data, function(c) { return max(c.values, function(d) { return parseFloat(d.queueQty); }); })+10]);
    y.domain([0,220]);


    const colors  = scaleOrdinal(schemeCategory10)

    switch(nodeStage) {
      case "CREATE": // Bind data and draw line
        // Add an SVG element with the desired dimensions and margin.
        const qLine = select(node)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        // Add the clip path.
        qLine.append("clipPath")
              .attr("id", "clip")
              .append("rect")
              .attr("width", width)
              .attr("height", height);

        // Add the x-axis.
        qLine.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the y-axis.
        qLine.append("g")
              .attr("class", "y axis")
              .attr("transform", "translate(" + width + ",0)")
              .call(yAxis)
              .text("No. of people waiting");

        qLine.selectAll('.line')
             .data([hQ,cQ])
             .enter()
               .append('path')
                 .attr('class', 'line')
                 .style('stroke', function(d) {
                   return colors(Math.random() * 50);
                 })
                 //.attr('clip-path', 'url(#clip)')
                 .attr('d', function(d) {
                   return line(d);
                 });
      break;
      case "UPDATE": // Bind new data and transition
        console.log("went into UPDATE!");
        const qLineUpdate = select(node);
        qLineUpdate.selectAll('.line')
             .data([hQ,cQ])
             .transition()
             .delay(100)
             .duration(1500)
               .attr('class', 'line')
               .attr('d', function(d) {
                 return line(d);
               });
        break;
        default:
        break;
    }

}

    // // UPDATE chart
    // updateTimeSeries = (historicalQueue,currentQueue) => {
    //   const node = this.node;
    //   const qLine = select(node);
    //   console.log(qLine);
    //
    //   const hQ = this.dateArrayParser(historicalQueue, false)
    //   const cQ = this.dateArrayParser(currentQueue, true);
    //   console.log(hQ)
    //   console.log(cQ)
    //   const margin = {top: 10, right: 10, bottom: 20, left: 10},
    //         width = 960 - margin.left - margin.right,
    //         height = 500 - margin.top - margin.bottom;
    //
    //   // Scales and axes. Note the inverted domain for the y-scale: bigger is up!
    //   const x = scaleTime().range([0, width]),
    //         y = scaleLinear().range([height, 0]),
    //         xAxis = axisBottom(x).tickFormat(timeFormat('%H')),
    //         yAxis = axisLeft(y)//.ticks(4).orient("left");
    //
    //   // Compute the minimum and maximum date, and the maximum queue.
    //   x.domain([hQ[0].date, hQ[hQ.length - 1].date]);
    //   y.domain([0,max(data, function(c) { return max(c.values, function(d) { return parseFloat(d.queueQty); }); })+10]);
    //
    //   // A line generator, for the dark stroke.
    //   const line = d3.line()
    //                 .x(function(d) { return x(d.date); })
    //                 .y(function(d) { return y(d.queueQty); })
    //                 .curve(d3.curveStepAfter)
    //
    //   // Bind new data and transition
    //   qLine.selectAll('.line')
    //        .data([hQ,cQ])
    //        .transition()
    //        .delay(500)
    //        .duration(2000)
    //          .attr('class', 'line')
    //          .attr('d', function(d) {
    //            return line(d);
    //          })
    // }
    //
    // DESTROY chart
    deleteTimeSeries = () => {
      const node = this.node;
      const qLine = select(node);
      qLine.selectAll('.line')
            .exit()
            .remove()
    }
    /* Add 'curtain' rectangle to hide entire graph */
    // const curtain = qLine.append('rect')
    //                       .attr('x', -1 * width)
    //                       .attr('y', -1 * height)
    //                       .attr('height', height)
    //                       .attr('width', width)
    //                       .attr('class', 'curtain')
    //                       .attr('transform', 'rotate(180)')
    //                       .style('fill', 'white')
    //                       .style('opacity', 0)

    /* Create a shared transition for anything we're animating */
    // const t = qLine.transition()
    //                 .delay(100)
    //                 .duration(2000)
    //                 .ease(d3.easeLinear)
    //                 .on('end', function() {
    //                   select('line.guide')
    //                   .transition()
    //                   .style('opacity', 0)
    //                   .remove()
    //                 });
    //
    // t.select('rect.curtain')
    //   .attr('width', 0);
    // t.select('line.guide')
    //   .attr('transform', 'translate(' + width + ', 0)')

// <div className="svgBox">
// </div>
  classParser = (differenceQueue) => {
    return differenceQueue > 0 ? "positiveDifference" : "negativeDifference"
  }

  render() {
    const differenceQueue = parseFloat(this.props.activeClinic.properties.differenceQueue);
    return (
      <div>
        <h3>{this.props.activeClinic.properties.name_full}</h3>
        <h4>is now <span className={this.classParser(differenceQueue)}>
        {differenceQueue > 0 ? (differenceQueue.toFixed(0) + "%more") :
        (Math.abs(differenceQueue.toFixed(0)) + "%less" )}</span> crowded than the average queue at this hour</h4>

        <svg ref={node => this.node = node}
              viewBox="0 0 960 500">
        </svg>

        {
          this.state.showWhichComponent==="subscribeClinicButton" ?  (
            <Subscribe backToClinicInfo={this.backToClinicInfo} />
          ) : (
            <div>
              <QueueList queue= {this.props.activeClinic.queue}/>
              <Link to="/seeQueue"><button id="subscribeClinicButton" type="submit" className="btn btn-info">See more queues or Submit a queue report</button></Link>
              <button id="subscribeClinicButton" type="submit" className="btn btn-info" onClick={this.onClick}>Subscribe to this Clinic</button>
            </div>
          )
        }
      </div>
    );
  }

  componentDidMount() {
      this.doTimeSeries(this.props.activeClinic.properties.historicalQueue, this.props.activeClinic.properties.currentQueue, 'CREATE');
   }

   componentDidUpdate() {
      this.doTimeSeries(this.props.activeClinic.properties.historicalQueue, this.props.activeClinic.properties.currentQueue, 'UPDATE');
   }

   componentWillUnMount() {
     this.deleteTimeSeries();
   }
}



const mapStateToProps = (state) => {
  return {
    activeClinic: state.activeClinic,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userNotification: (message) => {dispatch(userNotification(message));},
    clearNotif: () => {dispatch(clearNotif());}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolyClinicInfo);
