import React, { Component } from 'react'
import AddRecette from './AddRecette'
import AdminForm from './AdminForm'


class Admin extends Component {
    render() {
        const { recettes, addRecette, updateRecette, deleteRecette, chargerRecette } = this.props;
        
        return (
            <div className="cards">
                <AddRecette addRecette={addRecette} />
                {
                    Object.keys(recettes)
                        .map(key => <AdminForm
                            key={key} //particulier a react
                            id={key} //permet d'acceder à la key en tant que props
                            updateRecette={updateRecette}
                            deleteRecette={deleteRecette}
                            recettes={recettes} />
                        )
                }
            <footer>
                <button onClick={chargerRecette}>Remplir</button>
            </footer>
            </div>
        )
    }
}

export default Admin