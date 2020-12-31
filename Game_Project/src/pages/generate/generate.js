import React, { Component } from 'react';
import axios from 'axios';
import {Button, Dropdown, DropdownButton} from "react-bootstrap";

import genreList from "../../data/genreList";

import "./generate.css";

class Generate extends Component {

    constructor() {
        super();

        this.handleSave = this.handleSave.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Genres: ''
        }
    }

    // handle change of game title
    onChangeTitle(e) {
        this.setState({
            Title: e.target.value
        });
    }

    // handle change of game releasem year
    onChangeYear(e) {
        this.setState({
            Year: e.target.value
        });
    }

    // handle change for genre dropdown
    onChangeGenre(e) {
        this.setState({
            Genres: e
        })
    }

    // API call to save the game data
    handleSave(e) {
        axios.post(`http://localhost:4000/api/games`, {
            Title: this.state.Title,
            Year: this.state.Year,
            Genres: this.state.Genres
        })
            .then(response => {
                this.setState({
                    Title: '',
                    Year: '',
                    Genres: ''
                });
            })
            .catch(error => console.log(error));    

    }

    render() {
        return (
            <div className="createContainer">
                <div className="form-group">
                    <label>Game Title:</label>
                    <input type='text'
                        className='form-control'
                        value={this.state.Title}
                        onChange={this.onChangeTitle}></input>
                </div>
                <div className="form-group">
                    <label>Game Release Year:</label>
                    <input type='text'
                        className='form-control'
                        value={this.state.Year}
                        onChange={this.onChangeYear}></input>
                </div>
                <div className='form-group'>
                    <label>Game Genres:</label>
                    <DropdownButton onSelect={this.onChangeGenre} title={this.state.Genres}>
                        {
                            // lopping through static genre list
                            genreList.map(genre => (
                                <Dropdown.Item eventKey={genre.value} key={genre.key}>
                                    {genre.value}
                                </Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                </div>

                <div className="form-group">
                    <Button
                        className='btn btn-primary'
                        disabled={
                            this.state.Title === "" ||
                            this.state.Year === "" ||
                            this.state.Genres === ""
                        }
                        onClick={this.handleSave}
                    >
                        Add Game
                    </Button>
                </div>
            </div>
        );
    }
}

export default Generate;