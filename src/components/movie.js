import React, {Component} from 'react';
export default class Movie extends Component{
    render(){
        return (
                <div className="movie">
                    <div className="thumbContainer"><img src={this.props.url} className="thumbnail" alt="thumbnail"></img><div className="overlay"></div>
                    
                    <img className="updateIcon" src="edit.png" name={this.props.name} data-year={this.props.year} data-rating={this.props.rating} data-url={this.props.url} id={this.props.id} alt="update" onClick={this.props.update}/>
                    <img className="deleteIcon" src="trash.png" name={this.props.name} id={this.props.id} alt="delete" onClick={this.props.delete}/>
                    </div>
                    <p className="moviedesc">{this.props.name}</p>
                    <div className="secondLine">
                    <p className="moviedesc">{this.props.year}</p>
                    <p className="rating moviedesc">{this.props.rating}</p>
                    </div>
                </div>
        )
    }
}