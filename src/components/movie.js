import React, {Component} from 'react';
export default class Movie extends Component{
    render(){
        return (
                <div className="movie">
                    <div className="thumbContainer"><img src={this.props.url} className="thumbnail" alt="thumbnail"></img><div className="overlay"></div>
                    <img className="moreIcon" src="more.png" name={this.props.name} data-year={this.props.year} data-rating={this.props.rating} data-url={this.props.url} data-rated={this.props.rated} data-runtime={this.props.runtime} data-plot={this.props.plot} data-director={this.props.director} data-actors={this.props.actors} alt="more" onClick={this.props.getInfo}/>
                    <img className="playIcon" src="play.png" data-trailer={this.props.trailer} alt="play" onClick={this.props.play}/>
                    <img className="updateIcon" src="edit.png" name={this.props.name} data-trailer={this.props.trailer} data-year={this.props.year} id={this.props.id} alt="update" onClick={this.props.update}/>
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