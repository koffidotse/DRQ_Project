import React, { Component } from "react";
import PropTypes from "prop-types";

import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";

import genreList from "../../data/genreList";

class EditGame extends Component {
  
  constructor() {
    super();


    this.state = {
      Title: '',
      Year: '',
      Genres: ''
    }

    this.handleUpdateButton = this.handleUpdateButton.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
  }

  componentDidMount() {
    this.setState({
      Title: this.props.game.Title,
      Year: this.props.game.Year,
      Genres: this.props.game.Genres
    });
  }

  // handle update button click
  // pass the data to parent component
  handleUpdateButton() {
    this.props.handleUpdate({
      _id: this.props.game._id,
      Title: this.state.Title,
      Year: this.state.Year,
      Genres: this.state.Genres
    })
  }

  // handle change game title
  onChangeTitle(e) {
    this.setState({
        Title: e.target.value
    });
  }

  // handle change for game release year
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

  render () {    
    return (
      <Modal show>
        <Modal.Header closeButton>
          <Modal.Title>Edit Game Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                  genreList.map(genre => (
                    <Dropdown.Item eventKey={genre.value} key={genre.key}>
                      {genre.value}
                    </Dropdown.Item>
                  ))
                }
              </DropdownButton>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
          <br/>
          <Button
            className='btn btn-primary'
            disabled={
              this.state.Title === "" ||
              this.state.Year === "" ||
              this.state.Genres === ""
            }
            onClick={this.handleUpdateButton}
          >
            Update Game
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

EditGame.propTypes = {
  game: PropTypes.object,
  handleClose: PropTypes.func,
  handleUpdate: PropTypes.func
}

export default EditGame;
