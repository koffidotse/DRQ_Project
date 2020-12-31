import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import { Card , Button } from 'react-bootstrap';

import EditGame from "../editGame/editGame";

import defaultImage from "../../assest/images/ps4.jpeg";

import "./style.css";

class GameItem extends Component {

    constructor() {
        super();
        this.DeleteGame = this.DeleteGame.bind(this);
        this.editGame = this.editGame.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.state = {
            editModalVisible: false
        }
    }

    // API call to delete a game
    DeleteGame(e) {
        e.preventDefault();
        axios.delete(`http://localhost:4000/api/games/${this.props.game._id}`)
        .then(()=>{
            this.props.ReloadData();
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    // display the popup by setting the state variable
    editGame() {
        this.setState({
            editModalVisible: true
        });
    }

    // close the popup by setting the state variable
    handleClose() {
        this.setState({
            editModalVisible: false
        });
    }

    // API call to update the game data
    handleUpdate(gameData) {
        axios.put(`http://localhost:4000/api/updateGame`, gameData)
        .then(()=>{
            this.props.ReloadData();
            this.handleClose();
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <>
                <div className="gameItemContainer">
                    <Card>
                        <Card.Header>{this.props.game.Title}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <img
                                    src={this.props.game.Poster || defaultImage}
                                    width="150"
                                    height="200"
                                    alt=""
                                />
                                <footer className="blockquote-footer">
                                    Year : {this.props.game.Year}
                                </footer>
                                <footer className="blockquote-footer">
                                    Genres : {this.props.game.Genres}
                                </footer>
                            </blockquote>
                        </Card.Body>
                        {
                            // check for game id
                            // if present then add EDIT and DELETE button
                            //Else Null will be returned
                            this.props.game._id ?
                            <>
                                <Button variant="primary" onClick={this.editGame}>
                                    Edit
                                </Button>
                                <br />
                                <Button variant="danger" onClick={this.DeleteGame}>
                                    Delete
                                </Button>
                            </> : null
                        }
                        
                    </Card>
                </div>
                {
                    // check for edit modal is visible
                    this.state.editModalVisible &&
                    <EditGame
                        game={this.props.game}
                        handleClose={this.handleClose}
                        handleUpdate={this.handleUpdate}
                    />
                }
            </>
        );
    }
}

GameItem.propTypes = {
    game: PropTypes.object,
    ReloadData: PropTypes.func
}

GameItem.defaultProps = {
    ReloadData: () => {}
};

export default GameItem;