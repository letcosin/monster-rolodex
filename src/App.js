import React from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }
  //pra nao ficar com bind => arrow function
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { state } = this;
    const filteredMonsters = state.monsters.filter((monster) =>
      monster.name.toLowerCase().includes(state.searchField.toLowerCase())
    );
    return (
      <div className="App">
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
