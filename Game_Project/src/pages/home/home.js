import React, { Component } from 'react';

import GameItem from "../../components/gameItem/gameItem";

import gameList from "../../data/gameList";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to Game world!!!
        </h1>
        {
          gameList.length &&
          <div>
            {
              // Looping through static game list
              gameList.map(game => (
                <GameItem
                  key={game.Title}
                  game={game}
                />
              ))
            }
          </div>
        }
      </div>
    );
  }
}

export default Home;