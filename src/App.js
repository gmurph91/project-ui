import React, {Component} from 'react';
import './App.css';
import Movie from './components/movie';
import Popup from "reactjs-popup";
import { Dropdown } from 'reactjs-dropdown-component';
const axios = require('axios');
require('dotenv').config();


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    movies:[],
    name: "",
    year: "",
    rating: "",
    url: "",
    count: "0",
    updating: false,
    deleting: false,
    creating: false,
    playing: false,
    trailer: "",
    sortlist: [
      {
      id: 0,
      title: 'By Title (A-Z)',
      selected: true,
      key: 'sortlist'
},{
  id: 1,
  title: 'By Title (Z-A)',
  selected: false,
  key: 'sortlist'
},{
  id: 2,
  title: 'By Year (Newest)',
  selected: false,
  key: 'sortlist'
},{
  id: 3,
  title: 'By Year (Oldest)',
  selected: false,
  key: 'sortlist'
},
{
  id: 4,
  title: 'By Rating (Highest)',
  selected: false,
  key: 'sortlist'
},{
  id: 5,
  title: 'By Rating (Lowest)',
  selected: false,
  key: 'sortlist'
},
], 
  active: [{id: 0,
    title: 'By Title (A-Z)',
    selected: true,
    key: 'sortlist'}]
    }}

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    try {
      const response = await axios.get(`https://gregapis.herokuapp.com/movies`);
      this.setState({
              movies: await response.data,
            })
            this.setState({
              count: this.state.movies.length
            })
    } catch (err) {
      console.error(err);
    }
  }

  addMovie = async (event) => {
    event.preventDefault()
    this.setState({
      name: event.target[0].value, 
      year: event.target[1].value,
      rating: event.target[2].value,
      url: event.target[3].value,
      trailer: event.target[4].value,
      creating: false,
    })
    await(this.setState({event}))
    try {
      const apiCall = await axios.post('https://gregapis.herokuapp.com/movies/new', {
      name:this.state.name, 
      year: this.state.year,
      rating:this.state.rating, 
      url: this.state.url,
      trailer: this.state.trailer,
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

  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
          active: temp[id]
    });
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
        rating: event.target.getAttribute('data-rating'),
        url: event.target.getAttribute('data-url'),
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
        rating: event.target[2].value,
        url: event.target[3].value,
        trailer: event.target[4].value,
        updating: false,
      })
      await(this.setState({event}))
      try {
        const updateid = await axios.put(`https://gregapis.herokuapp.com/movies/update/${id}`, {
          name:this.state.name, 
          year: this.state.year,
          rating:this.state.rating, 
          url: this.state.url,
          trailer: this.state.trailer
          })
        await updateid
        this.getMovies()
        this.reset()
      } catch (err) {
        console.log(err)
      }
    }

  renderMovies = () => {
    let movies = this.state.movies
    
    if (this.state.active.id===0){
    let sortedMovies = movies.sort((function(a,b){
      let nameA = String(a.name).replace( /^(an?|the)\s/i, '' );
      let nameB = String(b.name).replace( /^(an?|the)\s/i, '' );
      if(nameA < nameB) { return -1; }
      if(nameA > nameB) { return 1; }
      return 0;
    }))
    return sortedMovies.map((movie, i) => {
      return <Movie key={i} name={movie.name} year={movie.year} trailer={movie.trailer} play={this.play} rating={movie.rating} url={movie.url} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
    })
  } else if (this.state.active.id===1){
      let sortedMovies = movies.sort((function(a,b){
      let nameA = String(a.name).replace( /^(an?|the)\s/i, '' );
      let nameB = String(b.name).replace( /^(an?|the)\s/i, '' );
        if(nameB < nameA) { return -1; }
        if(nameB > nameA) { return 1; }
        return 0;
      }))
    return sortedMovies.map((movie, i) => {
      return <Movie key={i} name={movie.name} year={movie.year} trailer={movie.trailer} play={this.play} rating={movie.rating} url={movie.url} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
    })
  } else if (this.state.active.id===2){
    let sortedMovies = movies.sort((function(a,b){
      if(b.year < a.year) { return -1; }
      if(b.year > a.year) { return 1; }
      return 0;
    }))
  return sortedMovies.map((movie, i) => {
    return <Movie key={i} name={movie.name} year={movie.year} trailer={movie.trailer} play={this.play} rating={movie.rating} url={movie.url} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
  })
} else if (this.state.active.id===3){
  let sortedMovies = movies.sort((function(a,b){
    if(a.year < b.year) { return -1; }
      if(a.year > b.year) { return 1; }
    return 0;
  }))
return sortedMovies.map((movie, i) => {
  return <Movie key={i} name={movie.name} year={movie.year} trailer={movie.trailer} play={this.play} rating={movie.rating} url={movie.url} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
})
} else if (this.state.active.id===4){
  let sortedMovies = movies.sort((function(a,b){
    if(b.rating < a.rating) { return -1; }
    if(b.rating > a.rating) { return 1; }
    return 0;
  }))
return sortedMovies.map((movie, i) => {
  return <Movie key={i} name={movie.name} year={movie.year} trailer={movie.trailer} play={this.play} rating={movie.rating} url={movie.url} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
})
} else if (this.state.active.id===5){
let sortedMovies = movies.sort((function(a,b){
  if(a.rating < b.rating) { return -1; }
    if(a.rating > b.rating) { return 1; }
  return 0;
}))
return sortedMovies.map((movie, i) => {
return <Movie key={i} name={movie.name} year={movie.year} trailer={movie.trailer} play={this.play} rating={movie.rating} url={movie.url} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
})
} else return movies.map((movie, i) => {
    return <Movie key={i} name={movie.name} year={movie.year} trailer={movie.trailer} play={this.play} rating={movie.rating} url={movie.url} id={movie._id} update={this.openUpdate} delete={this.openDelete}/>
  })
}

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
        <label>Rating:
          <input type="text" defaultValue = {this.state.rating} ref={el3 => this.element3 = el3} />
        </label>
        <label>Image URL:
          <input type="text" defaultValue = {this.state.url} ref={el4 => this.element4 = el4} />
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
          <label>Rating:
            <input type="text" defaultValue = {this.state.rating} ref={el3 => this.element3 = el3} />
          </label>
          <label>Image URL:
          <input type="text" defaultValue = {this.state.url} ref={el4 => this.element4 = el4} />
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
  return (
    <div className="App">
      <header><h1>Movies ({this.state.count})</h1><Dropdown
                              title="Sort"
                              list={this.state.sortlist}
                              resetThenSet={this.resetThenSet}
                        />
      <button className="bluebutton new" onClick={this.openCreate}>New</button>
      </header>
      <div className="main">
      {this.renderMovies()}
      <NewModal/>
      <UpdateModal/>
      <DeleteModal/>
      <Trailer/>
      </div>
    </div>
  );
  }
}