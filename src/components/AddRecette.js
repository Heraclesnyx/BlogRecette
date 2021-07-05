import React, { Component } from 'react'

class AddRecette extends Component {

    //Initialise un state vide pour pouvoir ajouter à l'aide d'un formulaire
    state = {
        nom: '',
        img: '',
        ingredients: '',
        instructions: ''
    }


    handleChange = event => {
        const { name, value } = event.target //event.target === input et textarea pour les différent ajout de notre recette
        this.setState({ [name]: value })  
    }

    handleSubmit  = event => {
        //validation formulaire 
        event.preventDefault()

        const recette = { ...this.state }
        this.props.addRecette(recette)

        //Reset
        Object.keys(recette).forEach(item => {
        recette[item] = ''}) //Remise à zero
        this.setState(({ ...recette }))
    }


    render() {
        return (
            <div className="card">  
                <form  className="admin-form ajouter-recette" onSubmit={this.handleSubmit}>
                    <input value={this.state.nom} onChange={this.handleChange} name="nom" type="text" placeholder="Nom de la recette"/>
                    <input value={this.state.img} onChange={this.handleChange} name="img" type="text" placeholder="Image de la recette"/>
                    <textarea value={this.state.ingredients} onChange={this.handleChange} name="ingredients"  rows="3" placeholder="Ingrédients de la recette"></textarea>
                    <textarea value={this.state.instructions} onChange={this.handleChange} name="instructions" rows="15" placeholder="Etapes de la recette"></textarea>
                    <button type="submit">Ajouter une nouvelle recette</button>
                </form>
            </div>
        )
    }
}

export default AddRecette