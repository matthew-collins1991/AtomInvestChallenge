import React from "react";
import { Grid, Card, Input, Button, Form, Dropdown} from "semantic-ui-react";
import "../../index.css";

export default class Search extends React.Component {

  state = {
    search: ""
  };

  handleChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.submitSearch(this.state.search);
  }

  handleReset = () => {
    this.setState({
      search: ""
    });
    this.props.submitSearch(this.state.search);
  }

  top5Words = () => {
    return this.props.top5Words.map(word => word[0])
  }

  top5Freq = () => {
    return this.props.top5Words.map(word => word[1])
  }

  onDropdownChange = (value) => this.props.submitSearch(value);


  render() {
    const {top5Words, top5Freq} = this;
    const { search } = this.state
    return (
      <Grid container>
        <Grid.Row column={16}>
          <Card id="searchCard">
            <Card.Content style={{width: 100 + '%'}}>
              <Card.Description >
                <Form onSubmit={this.handleSubmit} >
                  <Input
                    id="Input"
                    placeholder="Search by ID or Title..."
                    onChange={this.handleChange}
                  />
                  <Button
                    id="searchButton"
                    color="blue"
                    onClick={this.handleSubmit}
                  >
                    Search
                  </Button>
                  <Button
                    id="resetButton"
                    color="red"
                    onClick={this.handleReset}
                  >
                    Reset
                  </Button>
                  <Input
                    id="Input"
                    value={`Word Count: ${this.props.wordCount}`} 
                  />
                  <Dropdown 
                  text='Top 5 most common words'
                  >
                    <Dropdown.Menu >
                      <Dropdown.Item 
                      text={top5Words()[0]} 
                      description={top5Freq()[0]} 
                      onClick={() => this.onDropdownChange(top5Words()[0])}/>
                      <Dropdown.Item 
                      text={top5Words()[1]} 
                      description={top5Freq()[1]} 
                      onClick={() => this.onDropdownChange(top5Words()[1])}/>
                      <Dropdown.Item 
                      text={top5Words()[2]} 
                      description={top5Freq()[2]} 
                      onClick={() => this.onDropdownChange(top5Words()[2])}/>
                      <Dropdown.Item 
                      text={top5Words()[3]} 
                      description={top5Freq()[3]} 
                      onClick={() => this.onDropdownChange(top5Words()[3])}/>
                      <Dropdown.Item 
                      text={top5Words()[4]} 
                      description={top5Freq()[4]} 
                      onClick={() => this.onDropdownChange(top5Words()[4])}/>
                    </Dropdown.Menu>
                  </Dropdown>

                </Form>
              </Card.Description>
              
            </Card.Content>
         
          </Card>
        </Grid.Row>
      </Grid>
    );
  }
}
