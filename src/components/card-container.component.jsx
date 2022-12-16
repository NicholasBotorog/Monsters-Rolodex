import { Component } from "react";
import './style/card-container.css'


class CardContainer extends Component { 
  render() { 
    return(
      <div className="card-list">
        {this.props.monsters.map((monster) => {
          const { name, id, email } = monster
          return(
          <div className="card-container" key={id}>
            <img alt={name} src={`https://robohash.org/${id}?set=set2&size=180x180`}/>
            <h2>{name}</h2>
            <h3>{email}</h3>
          </div>
          )}
          )
        }
      </div>
    )
  }
}

export default CardContainer