import React, {Component} from 'react';
import './App.css';
import Movie from './components/movie';
import Popup from "reactjs-popup";
const axios = require('axios');
require('dotenv').config();


export default class App extends Component {
  state = {
    movies:[],
    name: "",
    year: "",
    rating: "",
    updating: false,
    deleting: false,
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:5040/movies`);
      this.setState({
              movies: await response.data
            })
    } catch (err) {
      console.error(err);
    }
  }

  // getMovies = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5040/movies')
  //     this.setState({
  //       movies: await response.json()
  //     })

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  addMovie = async () => {
    try {
      const apiCall = await axios.post('http://localhost:5040/movies/new', {
        name:this.state.name, 
      year: this.state.year,
      rating:this.state.rating, 
      })
      await apiCall
      this.getMovies()
    } catch (err) {
      console.log(err)
    }
  }

  openDelete = (event) => {
    this.setState({
      id: event.target.id,
      name: event.target.name,
      deleting: true,
    })
    console.log(this.state)
  }

  deleteMovie = async () => {
    try {
      let  id=this.state.id;
      const deleteid = await axios.delete(`http://localhost:5040/movies/delete/${id}`, {
      })
      await deleteid
      this.setState({
        deleting: false,
      })
      this.getMovies()
    } catch (err) {
      console.log(err)
    }}

    openUpdate = async (event) => {
      try {
      this.setState({
        id: event.target.id,
        name: event.target.name,
        year: event.target.getAttribute('data-year'),
        rating: event.target.getAttribute('data-rating'),
        updating:true,
      })
    } catch(e){
      console.log(e)
    }}

    updateMovie = async (event) => {
      event.preventDefault()
      let  id=this.state.id
      this.setState({
        name: event.target[0].value, 
        year: event.target[1].value,
        rating: event.target[2].value,
        updating: false,
      })
      await(this.setState({event}))
      try {
        const updateid = await axios.put(`http://localhost:5040/movies/update/${id}`, {
          name:this.state.name, 
          year: this.state.year,
          rating:this.state.rating, 
          })
        await updateid
        this.getMovies()
      } catch (err) {
        console.log(err)
      }
    }

      

  renderMovies = () => {
    return this.state.movies.map((movie, i) => {
      return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
    })
  }

render() {
  const UpdateModal = () => (
    <Popup
        open = {this.state.updating}
        modal
        onClose={this.reset}
      >
        <span>
        <form onSubmit={this.updateMovie}>
        <label>Name
          <input type="text" defaultValue = {this.state.name} ref={el => this.element = el} />
        </label>
        <label>Year
          <input type="text" defaultValue = {this.state.year} ref={el2 => this.element2 = el2} />
        </label>
        <label>Rating
          <input type="text" defaultValue = {this.state.rating} ref={el3 => this.element3 = el3} />
        </label>
        <input type="submit" value="Update"/>
      </form>
        </span>
      </Popup>
    )
    const DeleteModal = () => (
      <Popup
          open = {this.state.deleting}
          modal
          onClose={this.reset}
        >
          <span>
          Are you sure you want to delete {this.state.name}?
          <button onClick={this.deleteMovie}>Yes</button>
          </span>
        </Popup>
      )
  return (
    <div className="App">
      {this.renderMovies()}
      <UpdateModal/>
      <DeleteModal/>
      <form>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" value={this.state.name} onChange={(event)=>{
              this.setState({
                name: event.target.value
              })
            }}/>
            <label htmlFor="year">Year:</label>
            <input id="year" type="text" value={this.state.year} onChange={(event)=>{
              this.setState({
                year: Number(event.target.value)
              })
            }}/>
            <label htmlFor="rating">Rating:</label>
            <input id="rating" type="text" value={this.state.rating} onChange={(event)=>{
              this.setState({
                rating: Number(event.target.value)
              })
            }}/>
            <input type="button" onClick={this.addMovie} value="Create"/>
            </form>
    </div>
  );
  }
}