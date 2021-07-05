import React from 'react'

const AdminForm = ({
    id: key, //Changement de nom pour id
    updateRecette,
    recettes
}) => {
    const recette = recettes[key] //Permet de cibler l'élement à mettre à jour

    const handleChange = (event, key) => {
        const { name, value } = event.target
        const recette = recettes[key]
        recette[name] = value //Valeur modifier 
        updateRecette(key, recette) //Mise à jour avec les news values
    } 

    return(
        <div className="card">
            <form className="admin-form">

                <input value={recette.nom} onChange={e => handleChange(e, key)} type="text" name="nom" placeholder="Nom de la recette" />

                <input value={recette.image} onChange={e => handleChange(e, key)} type="text" name="image" placeholder="Adresse de l'image" />

                <textarea value={recette.ingredients} onChange={e => handleChange(e, key)} name="ingredients" rows="3" placeholder="Liste de mes ingrédients" />

                <textarea value={recette.instructions} onChange={e => handleChange(e, key)} name="instructions" rows="15" placeholder="Liste des instructions" />

            </form>
            <button>Delete</button>
        </div>
    )
}

export default AdminForm