import React, { Component } from 'react';
import PropTypes from "prop-types";

import GameItem from '../gameItem/gameItem';

class Games extends Component {

    render(){
        return this.props.games.map(game => {
            return (
                <GameItem
                    game={game}
                    ReloadData={this.props.ReloadData}
                />
            );
        })
    }
}

// passing data from parent to child component
Games.propTypes = {
    games: PropTypes.array,
    ReloadData: PropTypes.func
}

export default Games;
