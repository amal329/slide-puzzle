import React,{Component} from 'react';

export default class Tile extends Component{
    render(){

        if(this.props.img)
        {
            return(
                <div style={this.props.style} className="tile" key={this.props.originalIndex} onClick={() => {this.props.clickHandler(this.props.currentIndex)}}>
                    <img src={this.props.img} alt="tile"/>
                </div>
            );
        }
        else{
            return(
                <div style={this.props.style} className="tile" key={this.props.originalIndex} onClick={() => {this.props.clickHandler(this.props.currentIndex)}}>
                </div>
            );
        }
    }
}