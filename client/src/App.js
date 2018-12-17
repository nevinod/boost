import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import RadioExampleRadioGroup from './AnswerForm.js'


class App extends Component {
  constructor () {
    super()
    this.state = { value: '', correct: undefined }
    this.getProblems = this.getProblems.bind(this)
    this.getProblem = this.getProblem.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
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
    this.setState({correct: undefined })
    this.fetch(`/api/problems/${id}`)
      .then(problem => this.setState({problem: problem}))
  }

  componentDidUpdate () {

  }

  handleOptionChange(changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();

    if (this.state.selectedOption === 'A' && this.state.problem.answer === 1 ) {
      this.setState({correct: true})
    } else if (this.state.selectedOption === 'B' && this.state.problem.answer === 2 ) {
      this.setState({correct: true})
    } else if (this.state.selectedOption === 'C' && this.state.problem.answer === 3 ) {
      this.setState({correct: true})
    } else if (this.state.selectedOption === 'D' && this.state.problem.answer === 4 ) {
      this.setState({correct: true})
    } else {
      this.setState({correct: false})
    }

    // console.log(this.state.correct)
  }


  render () {
    let {problems, problem} = this.state
    // console.log(this.state)

    let button = <div />
    if(this.state.correct !== undefined) {
      console.log("corect is not undefined")
      if (this.state.correct) {
        button = <div class="ui green label">Correct</div>
      } else {
        button = <div class="ui red label">Incorrect</div>
      }
    }
    
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

        <RadioExampleRadioGroup answer={this.state.problem} />

        


      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App