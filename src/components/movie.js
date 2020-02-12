import React, {Component} from 'react';
export default class Movie extends Component{
    render(){
        return (
                <ul className="movie">
                    <li>Name: {this.props.name}</li>
                    <li>Year: {this.props.year}</li>
                    <li>Rating: {this.props.rating}</li>
                </ul>
        )
    }
}