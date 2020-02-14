import React, {Component} from 'react';
import './App.css';
import Movie from './components/movie';
const axios = require('axios');
require('dotenv').config();

export default class App extends Component {
  state = {
    movies:[],
    name: "",
    year: "",
    rating: "",
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

  renderMovies = () => {
    return this.state.movies.map((movie, i) => {
      return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating}/>
    })
  }

render() {
  return (
    <div className="App">
      {this.renderMovies()}
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