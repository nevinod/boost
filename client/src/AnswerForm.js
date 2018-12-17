import React, { Component } from 'react'
import { Form, Divider } from 'semantic-ui-react'

export default class RadioExampleRadioGroup extends Component {
	constructor(props) {
	  super(props)
	  this.state = {}
	  this.handleFormSubmit = this.handleFormSubmit.bind(this)
	  this.handleChange = this.handleChange.bind(this)
	}

	handleChange = (e, { value }) => {
		e.preventDefault()
		this.setState(
			{ value: value },
			() => console.log(`this.state.value = ${this.state.value}`)
		)
		console.log(`this.props.answer.answer = ${this.props.answer.answer}`)
		console.log(`value = ${value}`)
	}

	componentDidMount() {
		this.setState({ value: 'first' })
	}

	handleFormSubmit (e) {
		e.preventDefault()  		

  		if (this.state.value === 'first' && this.props.answer.answer === 1 ) {
      		this.setState({correct: true}, () => console.log(this.state.correct))
	    } else if (this.state.value === 'second' && this.props.answer.answer === 2 ) {
	    	console.log("ANSWER AND CHECKBOX MATCH")
	    	this.setState({correct: true}, () => console.log(this.state.correct))
	    } else if (this.state.value === 'third' && this.props.answer.answer === 3 ) {
	      	this.setState({correct: true}, () => console.log(this.state.correct))
	    } else if (this.state.value === 'fourth' && this.props.answer.answer === 4 ) {
	      	this.setState({correct: true}, () => console.log(this.state.correct))
	    } else {
	      	this.setState({correct: false}, () => console.log(this.state.correct))
	    }

	}

  render() {
  	const { value } = this.state
  	let button = <div/>
  	if(this.state.correct !== undefined) {
      console.log("correct is not undefined")
      if (this.state.correct) {
        button = <div className="ui teal label">Correct</div>
      } else {
        button = <div className="ui red label">Incorrect</div>
      }
    }

    return (
   		<Divider horizontal>
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
	      {button}
	    </Divider>
    )
  }
}
