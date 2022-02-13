import React,{useState,useEffect} from 'react';
import Tile from './Tile';

export default function Board({tileArray, lastTile,showTime,tileStyle,boardStyle}) {

    const [tiles,setTiles] = useState([]);
    const [blank,setBlank] = useState(8);
    const [solved,setSolved] = useState(false);
    const [startTime,setStartTime] = useState(null);

    useEffect(() => {
        if(tileArray.length > 0){
            let tileCompArray = tileArray.map((imgg,ind) => {
                return {
                    imgg : imgg,
                    currentIndex : ind,
                    originalIndex : ind
                };
            });
    
            tileCompArray.sort(() => Math.random() - 0.5);
    
            tileCompArray.forEach((tile,ind) => {
                tile.currentIndex = ind;
                return tile;
            });
    
            if(!isSolvable(tileCompArray)){
                // console.log("The puzzle cannot be solved");
                // let tempT = tileCompArray[0];
                // tileCompArray[0] = tileCompArray[3];
                // tileCompArray[3] = tempT;
                // console.log("Tile array length : "+tiles.length);
                tileCompArray = swapTiles(tileCompArray,0,3);
                // console.log(isSolvable(tileCompArray) ? "Can be now" : "Still nope");
            }
            // else{
            //     console.log("The puzzle can be solved.")
            // }
    
            tileCompArray.push({
                imgg: null,
                currentIndex : 8,
                originalIndex : 8
            });
    
            setTiles(tileCompArray);
            setSolved(false);
            setStartTime(null);
            setBlank(8);
        }
    },[tileArray]);

    useEffect(() => {
        // console.log("---After swapping---");
        // console.log("Tile array");
        // console.log(tiles);
        // console.log("Value of blank = "+blank);

        // if(isBoardValid())
        //     console.log("Board is VALID");
        // else
        //     console.log("Board is NOT VALID");

        if(!solved && tiles.length>0 && isBoardValid()){
            tiles[blank].imgg = lastTile;
            setTiles([...tiles]);
            setSolved(true);

            let elapsedTime = (new Date() - startTime)/1000;
            let minutes = 0;
            
            if(elapsedTime > 60){
                minutes = elapsedTime/60;
                elapsedTime = elapsedTime%60;
            }

            showTime(minutes,elapsedTime);
        }

    },[tiles,blank]);

    const swapTiles = (arr,i,j) => {

        let tempTile = arr[i];
        arr[i] = arr[j];
        arr[j] = tempTile;

        arr[j].currentIndex = j;
        arr[i].currentIndex = i;

        return arr;
    }

    const isSolvable = (arr) => {
        return countInversions(arr)%2===0;
    }

    const countInversions = (arr) => {
        let inv = 0;

        for(let i=0;i<arr.length;i++){
            for(let j=i+1;j<arr.length;j++){
                if(arr[i].originalIndex > arr[j].originalIndex){
                    inv++;
                }
            }
        }
        // console.log("INV count "+inv);
        return inv;
    }

    const tileHandler = (ind) => {
        // console.log("A tile with index "+ind+" was clicked");

        if(!startTime){
            setStartTime(new Date());
        }

        let dir = -1;

        if(ind%3!==2 && ind+1 === blank)
            dir = 1;
        else if(ind%3!==0 && ind-1 === blank)
            dir = 3;
        else if(ind>2 && ind-3 === blank)
            dir = 0;
        else if(ind<6 && ind+3 === blank)
            dir = 2;

        // let msg = "";

        // switch(dir){
        //     case 0 : msg = "Move up";
        //     break;
        //     case 1 : msg = "Move right";
        //     break;
        //     case 2 : msg = "Move down";
        //     break;
        //     case 3 : msg = "Move left";
        //     break;
        //     default : msg = "No neighboring blank cell"
        // }

        // console.log(msg);
        // console.log("Blank is at "+blank);
        // console.log("--------------");

        //swapping
        if(!solved && dir!==-1){
            // console.log("---Before swapping---");
            // console.log("Current index is = "+ind);
            // console.log("Blank index is = "+blank);

            // let tempTile = tiles[blank];
            // tiles[blank] = tiles[ind];
            // tiles[ind] = tempTile;

            // tiles[ind].currentIndex = ind;
            // tiles[blank].currentIndex = blank;

            setBlank(ind);
            setTiles([...swapTiles(tiles,blank,ind)]);
        }      
    }

    const isBoardValid = () => {
        return tiles.length>1 && tiles.reduce((prev, cur) => {
            return prev && cur.currentIndex === cur.originalIndex;
        },true);
    }

    return (
    <div className="board" style={solved ? boardStyle : {}}>
        {
            tiles.map(tile => {
                return(
                    <Tile style={solved ? {} : tileStyle} img={tile.imgg} key={tile.originalIndex} currentIndex={tile.currentIndex} originalIndex={tile.originalIndex} clickHandler={tileHandler}/>
                )
            })
        }
        </div>
    );
}
