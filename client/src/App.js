import React, { Component } from 'react'
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {}
    this.getProblems = this.getProblems.bind(this)
    this.getProblem = this.getProblem.bind(this)
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

  render () {
    let {problems, problem} = this.state
    return problems
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='paperclip' circular />
          <Header.Content>
            Practice SAT Questions
          </Header.Content>
        </Header>
        <Divider hidden section />
        {problems && problems.length
          ? <Button.Group vertical color='teal' fluid widths={problems.length} display='flex' flexDirection='column'>
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
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App