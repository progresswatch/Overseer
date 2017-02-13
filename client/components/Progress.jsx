import React, { Component } from 'react';

const Line = require('rc-progress').Line;

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   percent: 50,
      color: '',
    };
    this.stateChanger = this.stateChanger.bind(this);
  }

  stateChanger() {

  }

  render() {
    if (this.props.percent === 100) this.state.color = '#199fff';
    else if (this.props.percent >= 80) this.state.color = '#00ed23';
    else if (this.props.percent >= 60) this.state.color = '#ffff00';
    else if (this.props.percent >= 40) this.state.color = '#ff9d00';
    else if (this.props.percent >= 20) this.state.color = '#ff1900';
    else this.state.color = '#840101';
    return (
      <div>
        <h3>Line Progress {this.props.percent}%</h3>
        <div>
          <Line percent={this.props.percent} strokeWidth="4" strokeColor={this.state.color} />
        </div>
      </div>
    );
  }
}

export default Progress;