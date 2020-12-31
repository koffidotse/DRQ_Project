import React, { Component } from 'react';
import axios from 'axios';

import Games from '../../components/games/games';

class GameList extends Component {

    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        games: []
    };

    ReloadData(){
        axios.get(`http://localhost:4000/api/games`)
            .then((response) => {
                this.setState({ games: response.data })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidMount() {
        this.ReloadData();
    }

    render() {
        return (
            <div>
                {
                    // condition added for checking the games array
                    this.state.games.length ?
                        <Games
                            games={this.state.games}
                            ReloadData={this.ReloadData}
                        /> :
                        <>
                            <h1>This is the read component.</h1>
                            <h2>No game(s) available</h2>
                        </>
                }            
            </div>
        );
    }
}

export default GameList;

