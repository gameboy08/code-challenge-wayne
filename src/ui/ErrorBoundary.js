import React, { Component } from "react";
import ErrorContent from "./ErrorContent";
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("errorInfo", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContent>Something went wrong</ErrorContent>
      );
    }

    return this.props.children;
  }
}
