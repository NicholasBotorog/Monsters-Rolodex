import { Component } from "react";
import './style/card-list.css'
import CardContainer from '../components/card-container.component'

class CardList extends Component { 

  render() {
    const { monsters } = this.props
    return(
      <CardContainer monsters={monsters}/>
    )
  }
}

export default CardList