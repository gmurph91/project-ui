import React, {Component} from 'react';
export default class Movie extends Component{
    render(){
        return (
                <ul className="movie">
                    <li>Name: {this.props.name}</li>
                    <li>Year: {this.props.year}</li>
                    <li>Rating: {this.props.rating}</li>
                    <img className="updateIcon" src="edit.png" name={this.props.name} data-year={this.props.year} data-rating={this.props.rating} id={this.props.id} alt="update" onClick={this.props.update}/>
                    <img className="deleteIcon" src="trash.png" id={this.props.id} alt="delete" onClick={this.props.delete}/>
                </ul>
        )
    }
}