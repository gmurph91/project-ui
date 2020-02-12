import React, {Component} from 'react';
import './App.css';
import Movie from './components/movie';
const axios = require('axios');
require('dotenv').config({ path: './.env' })

export default class App extends Component {
  state = {
    movies:[],
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5040/movies');
      this.setState({
              movies: await response.data
            })
    } catch (err) {
      console.error(err);
    }
  }

  // getMovies = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5040/get')
  //     this.setState({
  //       movies: await response.json()
  //     })

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  renderMovies = () => {
    return this.state.movies.map((movie, i) => {
      return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating}/>
    })
  }

render() {
  return (
    <div className="App">
      {this.renderMovies()}
    </div>
  );
  }
}