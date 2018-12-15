import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider, Label } from 'semantic-ui-react'



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

    console.log(this.state.correct)
  }


  render () {
    let {problems, problem} = this.state
    console.log(this.state)

    let button = <div />
    if(this.state.correct !== undefined) {
      console.log("corect is not undefined")
      if (this.state.correct) {
        button = <a class="ui green label">Correct</a>
      } else {
        button = <a class="ui red label">Incorrect</a>
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

      <form onSubmit={this.handleFormSubmit}>
        <div className="radio">
          <label>
            <input type="radio" value="A" 
                          checked={this.state.selectedOption === 'A'} 
                          onChange={this.handleOptionChange} />
             A
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="B" 
                          checked={this.state.selectedOption === 'B'} 
                          onChange={this.handleOptionChange} />
             B
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="C" 
                          checked={this.state.selectedOption === 'C'} 
                          onChange={this.handleOptionChange} />
             C
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="D" 
                          checked={this.state.selectedOption === 'D'} 
                          onChange={this.handleOptionChange} />
             D
          </label>
        </div>

        <button className="btn btn-default" type="submit">Submit</button>
      </form>

      <div>
        {button}
      </div>

      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App