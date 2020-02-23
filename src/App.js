import React, {Component} from 'react';
import './App.css';
import Movie from './components/movie';
import Popup from "reactjs-popup";
const axios = require('axios');
require('dotenv').config()


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    movies:[],
    name: "",
    year: "",
    rating: "",
    loading: true,
    url: "",
    count: "0",
    count2: "0",
    updating: false,
    deleting: false,
    creating: false,
    playing: false,
    reading: false,
    reducedMovies: " ",
    trailer: "",
    selected: "movies",
    rated: "",
    runtime: "",
    plot: "",
    director: "",
    actors: "",
    type: "",
    sort: "",
  }}

  componentDidMount() {
    this.getMovies()
    this.loading()
  }

  loading = () => {
    var element = document.getElementById("loadingIcon")
    if (this.state.loading) {
      element.classList.remove("hidden")
    } else {
      element.classList.add("hidden")
    }
  }

  getMovies = async () => {
    try {
      const response = await axios.get(`https://gregapis.herokuapp.com/movies`);
      this.setState({
              movies: await response.data,
            })
            this.setState({
              loading: false,
            })
            this.count()
            this.loading()
    } catch (err) {
      console.error(err);
    }
  }

  count = () => {
             let all = this.state.movies
              let filtered =  all.filter(function(movie) {
                return movie.type === "movie";})
                let filtered2 =  all.filter(function(movie) {
                  return movie.type === "series";})
            this.setState({
              count: filtered.length,
              count2: filtered2.length
            })
  }

  addMovie = async (event) => {
    event.preventDefault()
    this.setState({
      name: event.target[0].value, 
      year: event.target[1].value,
      trailer: event.target[2].value,
      creating: false,
    })
    await(this.setState({event}))
    let t = this.state.name
      let y = this.state.year
      const response = await axios.get(`http://www.omdbapi.com/?t=${t}&y=${y}&apikey=cea84f0e`);
      this.setState({
              year: response.data.Year,
              rating: response.data.imdbRating,
              url: response.data.Poster,
              rated: response.data.Rated,
              runtime: response.data.Runtime,
              plot: response.data.Plot,
              director: response.data.Director,
              actors: response.data.Actors,
              type: response.data.Type
            })
    try {
      const apiCall = await axios.post('https://gregapis.herokuapp.com/movies/new', {
      name:this.state.name, 
      year: this.state.year,
      rating:this.state.rating, 
      url: this.state.url,
      trailer: this.state.trailer,
      rated: this.state.rated,
      runtime: this.state.runtime,
      plot: this.state.plot,
      director: this.state.director,
      actors: this.state.actors,
      type: this.state.type
      })
      await apiCall
      this.getMovies()
      this.reset()
    } catch (err) {
      console.log(err)
    }
  }

  reset = () => {
    this.setState({
      name: "",
    year: "",
    rating: "",
    url: "",
    trailer: "",
    updating: false,
    deleting: false,
    creating: false,
    playing: false,
    reading: false,
    rated: "",
    runtime: "",
    plot: "",
    director: "",
    actors: "",
    type: "",
    })
  }

  openDelete = (event) => {
    this.setState({
      id: event.target.id,
      name: event.target.name,
      deleting: true,
    })
  }

  openCreate = () => {
    this.setState({
        creating:true,
    })
  }

  getInfo = (event) => {
    try {
      this.setState({
        name: event.target.name,
        year: event.target.getAttribute('data-year'),
        rating: event.target.getAttribute('data-rating'),
        url: event.target.getAttribute('data-url'),
        rated: event.target.getAttribute('data-rated'),
        runtime: event.target.getAttribute('data-runtime'),
        plot: event.target.getAttribute('data-plot'),
        director: event.target.getAttribute('data-director'),
        actors: event.target.getAttribute('data-actors'),
        reading:true,
      })
    } catch(e){
      console.log(e)
    }}
  

  selector2 = async (event) => {
    this.setState({
      sort: event.target.value
    })
}

selector = async (event) => {
  this.setState({
    selected: event.target.value
  })
}

  deleteMovie = async () => {
    try {
      let  id=this.state.id;
      const deleteid = await axios.delete(`https://gregapis.herokuapp.com/movies/delete/${id}`, {
      })
      await deleteid
      this.getMovies()
      this.reset()
    } catch (err) {
      console.log(err)
    }}

    openUpdate = async (event) => {
      try {
      this.setState({
        id: event.target.id,
        name: event.target.name,
        year: event.target.getAttribute('data-year'),
        trailer: event.target.getAttribute('data-trailer'),
        updating:true,
      })
    } catch(e){
      console.log(e)
    }}

    play = async (event) => {
      try {
      const trailerinput = event.target.getAttribute('data-trailer')
      const trailerID = this.getvideoId(String(trailerinput))
      const trailerurl = "https://www.youtube.com/embed/" + trailerID + "?autoplay=1"
      this.setState({
        trailer: trailerurl,
        playing:true,
      })
    } catch(e){
      console.log(e)
    }
  }

 getvideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
      
}


    updateMovie = async (event) => {
      event.preventDefault()
      let  id=this.state.id
      this.setState({
        name: event.target[0].value, 
        year: event.target[1].value,
        trailer: event.target[2].value,
        updating: false,
      })
      await(this.setState({event}))
    let t = this.state.name
      let y = this.state.year
      const response = await axios.get(`http://www.omdbapi.com/?t=${t}&y=${y}&apikey=cea84f0e`);
      this.setState({
              year: response.data.Year,
              rating: response.data.imdbRating,
              url: response.data.Poster,
              rated: response.data.Rated,
              runtime: response.data.Runtime,
              plot: response.data.Plot,
              director: response.data.Director,
              actors: response.data.Actors,
              type: response.data.Type
            })
    try {
      const updateid = await axios.put(`https://gregapis.herokuapp.com/movies/update/${id}`, {
        name:this.state.name, 
      year: this.state.year,
      rating:this.state.rating, 
      url: this.state.url,
      trailer: this.state.trailer,
      rated: this.state.rated,
      runtime: this.state.runtime,
      plot: this.state.plot,
      director: this.state.director,
      actors: this.state.actors,
      type: this.state.type
      })
      await updateid
      this.getMovies()
      this.reset()
    } catch (err) {
      console.log(err)
      }
    }

   

  renderMovies = () => {
    try{
    if(this.state.reducedMovies === " " && this.state.selected === "movies"){
    let all = this.state.movies
    var filtered =  all.filter(function(movie) {
      return movie.type === "movie";
    })
  } else {
    let all = this.state.movies
    // eslint-disable-next-line
    var filtered =  all.filter(function(movie) {
      return movie.type === "series";
    });
  } 
  let movies = filtered
    if (this.state.sort==="titleA"){
    let sortedMovies = movies.sort((function(a,b){
      let nameA = String(a.name).replace( /^(an?|the)\s/i, '' );
      let nameB = String(b.name).replace( /^(an?|the)\s/i, '' );
      if(nameA < nameB) { return -1; }
      if(nameA > nameB) { return 1; }
      return 0;
    }))
    return sortedMovies.map((movie, i) => {
      return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} url={movie.url} trailer={movie.trailer} rated={movie.rated} runtime={movie.runtime} plot={movie.plot} director={movie.director} actors={movie.actors} play={this.play} id={movie._id} update={this.openUpdate} delete={this.openDelete} getInfo={this.getInfo}/>
    })
  } else if (this.state.sort==="titleZ"){
      let sortedMovies = movies.sort((function(a,b){
      let nameA = String(a.name).replace( /^(an?|the)\s/i, '' );
      let nameB = String(b.name).replace( /^(an?|the)\s/i, '' );
        if(nameB < nameA) { return -1; }
        if(nameB > nameA) { return 1; }
        return 0;
      }))
    return sortedMovies.map((movie, i) => {
      return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} url={movie.url} trailer={movie.trailer} rated={movie.rated} runtime={movie.runtime} plot={movie.plot} director={movie.director} actors={movie.actors} play={this.play} id={movie._id} update={this.openUpdate} delete={this.openDelete} getInfo={this.getInfo}/>
    })
  } else if (this.state.sort==="yearA"){
    let sortedMovies = movies.sort((function(a,b){
      if(b.year < a.year) { return -1; }
      if(b.year > a.year) { return 1; }
      return 0;
    }))
  return sortedMovies.map((movie, i) => {
    return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} url={movie.url} trailer={movie.trailer} rated={movie.rated} runtime={movie.runtime} plot={movie.plot} director={movie.director} actors={movie.actors} play={this.play} id={movie._id} update={this.openUpdate} delete={this.openDelete} getInfo={this.getInfo}/>
  })
} else if (this.state.sort==="yearZ"){
  let sortedMovies = movies.sort((function(a,b){
    if(a.year < b.year) { return -1; }
      if(a.year > b.year) { return 1; }
    return 0;
  }))
return sortedMovies.map((movie, i) => {
  return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} url={movie.url} trailer={movie.trailer} rated={movie.rated} runtime={movie.runtime} plot={movie.plot} director={movie.director} actors={movie.actors} play={this.play} id={movie._id} update={this.openUpdate} delete={this.openDelete} getInfo={this.getInfo}/>
})
} else if (this.state.sort==="ratingA"){
  let sortedMovies = movies.sort((function(a,b){
    if(b.rating < a.rating) { return -1; }
    if(b.rating > a.rating) { return 1; }
    return 0;
  }))
return sortedMovies.map((movie, i) => {
  return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} url={movie.url} trailer={movie.trailer} rated={movie.rated} runtime={movie.runtime} plot={movie.plot} director={movie.director} actors={movie.actors} play={this.play} id={movie._id} update={this.openUpdate} delete={this.openDelete} getInfo={this.getInfo}/>
})
} else if (this.state.sort==="ratingZ"){
let sortedMovies = movies.sort((function(a,b){
  if(a.rating < b.rating) { return -1; }
    if(a.rating > b.rating) { return 1; }
  return 0;
}))
return sortedMovies.map((movie, i) => {
  return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} url={movie.url} trailer={movie.trailer} rated={movie.rated} runtime={movie.runtime} plot={movie.plot} director={movie.director} actors={movie.actors} play={this.play} id={movie._id} update={this.openUpdate} delete={this.openDelete} getInfo={this.getInfo}/>
})
} else return movies.map((movie, i) => {
    return <Movie key={i} name={movie.name} year={movie.year} rating={movie.rating} url={movie.url} trailer={movie.trailer} rated={movie.rated} runtime={movie.runtime} plot={movie.plot} director={movie.director} actors={movie.actors} play={this.play} id={movie._id} update={this.openUpdate} delete={this.openDelete} getInfo={this.getInfo}/>
  })
} catch(e){console.log(e)}}
render() {
  const UpdateModal = () => (
    <Popup
        open = {this.state.updating}
        modal
        onClose={this.reset}
        className="form"
      >
         {close => (
      <div>
        <button className="close" onClick={close}>
          X
        </button>
<span>
        <form onSubmit={this.updateMovie}>
        <label>Name:
          <input type="text" defaultValue = {this.state.name} ref={el => this.element = el} />
        </label>
        <label>Year:
          <input type="text" defaultValue = {this.state.year} ref={el2 => this.element2 = el2} />
        </label>
        <label>Trailer URL:
          <input type="text" defaultValue = {this.state.trailer} ref={el5 => this.element5 = el5} />
        </label>
        <input type="submit" value="Update"/>
      </form>
        </span>
      </div>
    )}
      </Popup>
    )
    const NewModal = () => (
      <Popup
          open = {this.state.creating}
          modal
          onClose={this.reset}
          className="form"
        >
           {close => (
        <div>
          <button className="close" onClick={close}>
            X
          </button>
  <span>
          <form onSubmit={this.addMovie}>
          <label>Name:
            <input type="text" defaultValue = {this.state.name} ref={el => this.element = el} autoFocus/>
          </label>
          <label>Year:
            <input type="text" defaultValue = {this.state.year} ref={el2 => this.element2 = el2} />
          </label>
        <label>Trailer URL:
          <input type="text" defaultValue = {this.state.trailer} ref={el5 => this.element5 = el5} />
        </label>
          <input type="submit" value="Create"/>
        </form>
          </span>
        </div>
      )}
        </Popup>
      )
    const DeleteModal = () => (
      <Popup
          open = {this.state.deleting}
          modal
          onClose={this.reset}
          className="form"
        >
        
  <span>
          Are you sure you want to delete {this.state.name}?
          <div>
          <button className="bluebutton" onClick={this.deleteMovie}>Yes</button>
          <button className="bluebutton" onClick={this.reset}>Cancel</button>
          </div>
          </span>
        </Popup>
      )
      const Trailer = () => (
        <Popup
            open = {this.state.playing}
            modal
            onClose={this.reset}
            className="trailer"
          >
            {close => (
        <div>
          <button className="close2" onClick={close}>
            X
          </button>
            <span>
            <iframe title="trailer" frameBorder="0" src={this.state.trailer}></iframe>
            </span>
            </div>
            )}
          </Popup>
        )
        const Info = () => (
          <Popup
              open = {this.state.reading}
              modal
              onClose={this.reset}
              className="info"
            >
              {close => (
          <div className="infoBox">
            <button className="close3" onClick={close}>
              X
            </button>
              <img src={this.state.url} alt="thumbnail"/>
              <div className="infoHeader">
              <p className="infoName">{this.state.name}</p>
              <p className="infoYear">{this.state.year}</p>
              <p className="infoRated">{this.state.rated}</p>
              <p className="infoRuntime">{this.state.runtime}</p>
              <p className="infoRating">IMDB Rating: {this.state.rating}</p>
              </div>
              <p className="infoDirector"><p className="firstWord">Director: </p>{this.state.director}</p>
              <p className="infoActors"><p className="firstWord">Cast: </p>{this.state.actors}</p>
              <p className="infoPlot"><p className="firstWord">Summary: </p>{this.state.plot}</p>
              </div>
              )}
            </Popup>
          )
  return (
    <div className="App">
      <header>
      <select onChange={this.selector}>
        <option value="movies">Movies ({this.state.count})</option>
        <option value="shows">TV Shows ({this.state.count2})</option>
      </select>
      <select onChange={this.selector2}>
      <option value="titleA">Sort:</option>
        <option value="titleA">By Title (A-Z)</option>
        <option value="titleZ">By Title (Z-A)</option>
        <option value="yearA">By Year (Newest)</option>
        <option value="yearZ">By Year (Oldest)</option>
        <option value="ratingA">By Rating (Highest)</option>
        <option value="ratingZ">By Rating (Lowest)</option>
      </select>

      <button className="bluebutton new" onClick={this.openCreate}>New</button>
      </header>
      <div className="main">
      {this.renderMovies()}
      <NewModal/>
      <UpdateModal/>
      <DeleteModal/>
      <Trailer/>
      <Info/>
      <img id="loadingIcon" src="loading.gif" alt="loading"/>
      </div>
    </div>
  );
  }
}