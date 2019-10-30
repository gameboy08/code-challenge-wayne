import React from "react";

import moment from "moment-timezone";

class DisplayTime extends React.Component {
  state = {
    dateTime: ""
  };
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.timeZoneName !== this.props.timeZoneName) {
      this.updateTime();
    }
  }
  componentDidMount() {
    this.updateTime();
  }
  componentWillUnmount() {
    if(this.timer) {
      clearInterval(this.timer)
    }
  }

  updateTime = () => {
    const { timeZoneName } = this.props;
    if(this.timer) {clearInterval(this.timer)};
    this.timer = setInterval(() => {
      const dateTime = moment()
        .tz(timeZoneName)
        .format("YYYY-MM-DD HH:mm:ss z");
      this.setState({
        dateTime
      })
    }, 1000);
  }

  render() {
    return <span>{this.state.dateTime}</span>;
  }
}

export default DisplayTime;
