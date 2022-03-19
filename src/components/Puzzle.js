import React from 'react';
import img from "../static/simface.jpg";
import Board from './Board';
import Refresh from './Refresh';
import Result from './Result';

export default class Puzzle extends React.Component{
    image = new Image();
    
    constructor(props){
        super(props);
        this.showTime = this.showTime.bind(this);
        this.refresh = this.refresh.bind(this);
        this.state = {imagePieces : [], canShow : false, minutes : 0, seconds:  0};
    }

    showTime(minutes,seconds){
        this.setState({
            canShow : true,
            minutes : minutes,
            seconds : seconds
        });
    }

    componentDidMount = () => {
        this.image.src=img;
        this.image.onload = this.cutImageUp;
    }

    render(){
        return (
            <div className="puzzle">
                <Refresh clickHandler={this.refresh}/>
                <Board tileArray={this.state.imagePieces} showTime={this.showTime} tileStyle = {{border : "0.5px rgb(255, 255, 255) solid"}} boardStyle={{maxWidth : "301px"}}/>
                <Result show={this.state.canShow} minutes={this.state.minutes} seconds={this.state.seconds}/>
            </div>
        );
    };

    refresh(){
        this.setState({
            imagePieces : [...this.state.imagePieces],
            canShow : false,
            minutes :0,
            seconds: 0
        });
    }

    cutImageUp = () => {
        let pieces = [];
        const rows = 3;
        const cols = 3;
        const len = this.image.width/3;
    
        for(var x = 0; x < rows; x++) {
            for(var y = 0; y < cols; y++) {
                var canvas = document.createElement('canvas');
                canvas.width = 100;
                canvas.height = 100;
                var context = canvas.getContext('2d');
                context.drawImage(this.image, y * len, x * len,len,len, 0, 0, canvas.width, canvas.height);
                pieces.push(canvas.toDataURL());
            }
        }
        
        this.setState({imagePieces : pieces});
    }
}