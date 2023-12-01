import { Component } from "react";
import { Alert } from "react-bootstrap";

export default class ErrorBoundary extends Component {

    constructor() {
        super()

        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        console.log("GetDerivedStateFromError");
        return {
            hasError: true,
        }
    }

    render() {

        if (this.state.hasError) {
            console.log(this.state);
            return <Alert variant={"danger"}>
            Something went wrong
          </Alert>
        }
        return this.props.children;
    }
} 