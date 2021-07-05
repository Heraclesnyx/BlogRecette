import React, { Component } from 'react'
import AddRecette from './AddRecette'
import AdminForm from './AdminForm'
import Login from './Login'


import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../base'

class Admin extends Component {
    state = {
        uid: null,
        chef: null
    }



    handleAuth = async authData => {
        const box = await base.fetch(this.props.pseudo, { context: this}) //Cherche data

        if(!box.chef){
            await base.post(`${this.props.pseudo}/chef`, {
                data: authData.user.uid
            })
        }

        this.setState({
            uid: authData.user.uid,
            chef: box.chef || authData.user.uid //1er cas ==> si box.chef existegrace au fetch précédent || (2e cas) personne qui viens de se connecter
        })
    }


    //Permet de se connecter via firebase
    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()

        firebaseApp
            .auth()
            .signInWithPopup(authProvider) //Ouvre une pop-up pour demander si user veux se connecter avec son compte facebook
            .then(this.handleAuth) //Envoie une promesse
    }


    logout = async () => {

        await firebase.auth().signOut()
        this.setState({ uid: null })
    }

    render() {
        const { recettes, addRecette, updateRecette, deleteRecette, chargerRecette } = this.props;
        
        const logout = <button onClick={this.logout}> Déconnexion</button>
        
        
        //Si user n'est pas connecter
        if(!this.state.uid){
            return <Login authenticate={this.authenticate} />
        }

        if(this.state.uid !== this.state.chef){
            return(
                <div>
                    <p>Tu n'es pas le bon chef de cette recette</p>
                    {logout}
                </div>
            )
        }

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
                {logout}
                <button onClick={chargerRecette}>Remplir</button>
            </footer>
            </div>
        )
    }
}

export default Admin