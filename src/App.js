import { Component } from 'react';

import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor() { 
    super()

    this.state = {
      monsters: [],
      searchField: '',
    }
  }

  componentDidMount () { 
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => this.setState(() => { 
        return {monsters: users}
      }, () => { 
        console.log(this.state)
      }))
  }

  onSearchChange = (event)=>{
      const searchField = event.target.value.toLowerCase()
      this.setState(() => { 
        return { searchField }
      })
    }
  

  render() {

    const { monsters, searchField } = this.state
    const { onSearchChange } = this

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    })

    return (
      <div className="App">

        <input className='searchBox' type='search' placeholder='Search Monsters...'  onChange={onSearchChange}/>

        {filteredMonsters.map(monster => { 
            return ( 
            <h1 key={monster.id}>{monster.name}</h1>
            )})}
      </div>
    );
  }
}

export default App;
