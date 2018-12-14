import React, { Component, PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

class AnswerForm extends Component {
  constructor () {
    super()
    this.state = { value: '' }
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 1) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    if (this.state.value === 'A' && this.state.problem.answer === 1 ) {
      console.log('CORRECT')
    } else if (this.state.value === 'B' && this.state.problem.answer === 2 ) {
      console.log('CORRECT')
    } else if (this.state.value === 'C' && this.state.problem.answer === 3 ) {
      console.log('CORRECT')
    } else if (this.state.value === 'D' && this.state.problem.answer === 4 ) {
      console.log('CORRECT')
    } else {
      console.log("INCORRECT")
    }

  }