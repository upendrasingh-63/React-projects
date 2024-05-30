import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
        <div className="text-center">
        <div className="spinner-border" role="status" style={{ marginBottom: "10px",marginTop:"10px" }}>
        {/* <span className="sr-only text-center"></span> */}
        </div>
      </div>
    )
  }
}

export default Spinner