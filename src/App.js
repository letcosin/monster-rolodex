import React from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchField: "",
      title: this.props.increment,
    };
  }

  //unidirectional data flow
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (event) => {
    this.setState({
      searchField: event.target.value,
    });
    this.setState(
      (prevState, prevProps) => {
        return {
          title: prevState.title + prevProps.increment,
        };
      },
      () => console.log(this.state.title)
    );
  };

  render() {
    const { state } = this;
    const filteredMonsters = state.monsters.filter((monster) =>
      monster.name.toLowerCase().includes(state.searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>{state.title}</h1>
        <SearchBox
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
