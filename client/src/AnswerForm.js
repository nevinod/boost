import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class RadioExampleRadioGroup extends Component {
	constructor() {
	  super()
	  this.state = {correct: null, value: null}
	  this.handleFormSubmit = this.handleFormSubmit.bind(this)
	  this.handleChange = this.handleChange.bind(this)
	}

	handleChange = (e, { value }) => {
		e.preventDefault()
		this.setState({ value: value })
		console.log(`this.props.answer.answer = ${this.props.answer.answer}`)
		console.log(`value = ${value}`)
		console.log(`this.state.value = ${this.state.value}`)
	}

	componentDidMount() {
		this.setState({ value: 'first' })
	}

	handleFormSubmit (e) {
		// e.preventDefault()  		

  		if (this.state.value === 'first' && this.props.answer.answer === 1 ) {
      		this.setState({correct: true})
	    } else if (this.state.value === 'second' && this.props.answer.answer === 2 ) {
	    	console.log("ANSWER AND CHECKBOX MATCH")
	    	this.setState({correct: true})
	    } else if (this.state.value === 'third' && this.props.answer.answer === 3 ) {
	      	this.setState({correct: true})
	    } else if (this.state.value === 'fourth' && this.props.answer.answer === 4 ) {
	      	this.setState({correct: true})
	    } else {
	      	this.setState({correct: false})
	    }

    	console.log(this.state.correct)
	}

  render() {
  	const { value } = this.state
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group inline>
          <Form.Radio
            label='A'
            value='first'
            checked={value === 'first'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='B'
            value='second'
            checked={value === 'second'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='C'
            value='third'
            checked={value === 'third'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='D'
            value='fourth'
            checked={value === 'fourth'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <input type="submit" value="Submit" className="ui teal button"/>
      </Form>
    )
  }
}
