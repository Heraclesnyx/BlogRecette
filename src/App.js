import React, { Component } from 'react'
// CSS
import './App.css';

import Header from './components/Header';
import Admin from './components/Admin';
import Card from './components/Card';
import recettes from './recettes';


//Firebase
import base from './base';


class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  }

  //Synchronisation ac firebase
  componentDidMount () {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: 'recettes'
    })
  }

  //Désynchronisation de firebase lorsque le component se ferme
  componentWillUnmount () {
    base.removeBinding(this.ref)
  }


  //Méthode permettant d'ajouter une recette
  addRecette = recette => {
    const recettes = { ...this.state.recettes }
    recettes[`recette-${Date.now()}`] = recette
    this.setState({ recettes })
  }


  //Méthode permettant de modifer une recette
  updateRecette = (key, newRecette) => {
    const recettes = { ...this.state.recettes }
    recettes[key] = newRecette
    this.setState({ recettes })
  }

  //Supprimer recette
  deleteRecette = key => {
    const recettes = { ...this.state.recettes }
    recettes[key] = null
    this.setState({ recettes })
  }


  chargerRecette = () => this.setState({ recettes})

  render () {
    const cards = Object.keys(this.state.recettes)
            .map(key => <Card key={key} details={this.state.recettes[key]} />
              )


    return (
      <div className='box'>
        <Header pseudo={this.state.pseudo} />
        <div className='cards'>
          { cards }  
        </div>
        <Admin
          pseudo = {this.state.pseudo}
          recettes={this.state.recettes}
          addRecette={this.addRecette}
          updateRecette={this.updateRecette}
          deleteRecette={this.deleteRecette} 
          chargerRecette={this.chargerRecette} />
      </div>
    )
  }
}

export default App
