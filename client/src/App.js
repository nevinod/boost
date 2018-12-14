import React, { Component, PropTypes } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

class App extends Component {
  constructor () {
    super()
    this.state = { value: '' }
    this.getProblems = this.getProblems.bind(this)
    this.getProblem = this.getProblem.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    this.getProblems()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getProblems () {
    this.fetch('/api/problems')
      .then(problems => {
        if (problems.length) {
          this.setState({problems: problems})
          this.getProblem(problems[0].id)
        } else {
          this.setState({problems: []})
        }
      })
  }

  getProblem (id) {
    this.fetch(`/api/problems/${id}`)
      .then(problem => this.setState({problem: problem}))
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

  render () {
    let {problems, problem} = this.state
    console.log(this.state)
    return problems
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='pencil' circular />
          <Header.Content>
            SAT Problems
          </Header.Content>
        </Header>
        <Divider hidden section />
        {problems && problems.length
          ? <Button.Group vertical color='teal' fluid widths={problems.length}>
            {Object.keys(problems).map((key) => {
              return <Button active={problem && problem.id === problems[key].id} fluid key={key} onClick={() => this.getProblem(problems[key].id)}>
                {problems[key].question}
              </Button>
            })}
          </Button.Group>
          : <Container >No problems found.</Container>
        }
        <Divider section />
        {problem &&
          <Container>
            <Header as='h2'>{problem.question}</Header>
            {problem.answers &&
              <Segment.Group>
                {problem.answers.map((answer, i) => <Segment key={i}>{answer.text}</Segment>)}
              </Segment.Group>
            }
          </Container>
        }

        <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Submit answer here: </ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>

      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App