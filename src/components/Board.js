import React,{useState,useEffect} from 'react';
import Tile from './Tile';

export default function Board({tileArray,showTime,tileStyle,boardStyle}) {

    const [tiles,setTiles] = useState([]);
    const [blank,setBlank] = useState(8);
    const [solved,setSolved] = useState(false);
    const [startTime,setStartTime] = useState(null);
    const [lastTileImg,setLastTileImg] = useState({});

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

            let missingTile = Math.floor(Math.random()*tileCompArray.length);
            let missingTileImg = tileCompArray[missingTile].imgg;
            tileCompArray[missingTile].imgg = null;
    
            if(!isSolvable(tileCompArray)){
                console.log("The puzzle cannot be solved");
                console.log("Tile array length : "+tiles.length);
                tileCompArray = makeSolvable(tileCompArray);
                console.log(isSolvable(tileCompArray) ? "Can be now" : "Still nope");
            }
            // else{
            //     console.log("The puzzle can be solved.")
            // }
    
            setTiles(tileCompArray);
            setSolved(false);
            setStartTime(null);
            setBlank(missingTile);
            setLastTileImg(missingTileImg);
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
            tiles[blank].imgg = lastTileImg;
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
        else{
            console.log("Can be solved!");
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

        for(let i=0;i<arr.length - 1;i++){
            for(let j=i+1;j<arr.length;j++){
                if(arr[i].imgg && arr[j].imgg && arr[i].originalIndex > arr[j].originalIndex){
                    inv++;
                }
            }
        }
        
        console.log("INV count "+inv);
        return inv;
    }

    const makeSolvable = (tileCompArray) => {
        if(!tileCompArray[0].imgg || !tileCompArray[1].imgg){
            console.log("Oh no, blank is at the beginning")
            return swapTiles(tileCompArray,7,8);
        }
        return swapTiles(tileCompArray,0,1);
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

        let msg = "";

        switch(dir){
            case 0 : msg = "Move up";
            break;
            case 1 : msg = "Move right";
            break;
            case 2 : msg = "Move down";
            break;
            case 3 : msg = "Move left";
            break;
            default : msg = "No neighboring blank cell"
        }

        console.log(msg);
        console.log("Blank is at "+blank);
        console.log("--------------");

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
