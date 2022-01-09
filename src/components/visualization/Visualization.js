import {useRef,useEffect, useState} from 'react'
import Node  from "../Node/Node"
import "./Visualization.css"
import {useGlobalContext} from "../../context/context"
import getInicialGrid from '../help/getInicialGrid'
import updateGridWalls from '../help/updateGridWalls'
import {Dijkstran} from "../../algorithms/dijkstra"
import animationIsPath from "../help/animationIsPath"
import isFirstOrSecond from '../help/isFirstOrSecond'
import aStart from '../../algorithms/aStar'

const getRowsAndCols = visualizationRef=>{
    const width = visualizationRef.current.clientWidth
    const height = visualizationRef.current.clientHeight
    const ROWS = Math.floor(height / 25)
    const COLS = Math.floor(width / 25)
    const dimensions = {ROWS,COLS}    
    return dimensions
}

const createCssGrid = (rows,cols)=>({
    gridTemplateRows: `repeat(${rows},25px)`,
    gridTemplateColumns: `repeat(${cols},25px)`,
    width: `${cols * 25}px`,
    height: `${rows * 25}px`
});

export default function Visualization({firstOrSecond,gridOne,setGridOne,gridTwo,setGridTwo}) {
    //Hooks
    const visualizationRef = useRef()
    const [cssGrid, setCssGrid] = useState({})
    const {config} = useGlobalContext()
    const {toggleWalls,isPath,isVisualizationTwo} = config
    const [gridStartNode,setGridStartNode] = useState({})
    const [gridEndNode,setGridEndNode] = useState({})

    const gridOneLocal = gridOne 
    const setGridOneLocal = setGridOne

    const gridTwoLocal = gridTwo
    const setGridTwoLocal = setGridTwo

    const className = isFirstOrSecond(firstOrSecond)

    const [mouseIs,setMouseIs] = useState({
        startNode: false,
        pressed: false
    });

    let STARTNODE
    let ENDNODE

    useEffect(_=>{
        const {ROWS,COLS} = getRowsAndCols(visualizationRef)
        STARTNODE = {row:Math.floor(ROWS/2),col:0}
        ENDNODE = {row: Math.floor(ROWS/2),col: COLS - 1}
        setGridStartNode(STARTNODE)
        setGridEndNode(ENDNODE)
        setCssGrid(createCssGrid(ROWS,COLS))
        setGridOneLocal(getInicialGrid(ROWS,COLS,STARTNODE,ENDNODE))
    },[])

    const onMouseDown = (row,col,typeNode)=>{
        setMouseIs({
                StartOrEndNode: typeNode !== "" &&
                                typeNode !== "is-wall" ? 
                                typeNode : false,
                pressed: true
            })
        if(typeNode != "start-node" && typeNode != "end-node"){
            const newGrid = wallToggle(gridOneLocal,row,col)
            setGridOneLocal(newGrid)
            addWallToggleVisualizationTwo(row,col)
        }
    }
    const onMouseEnter = (row,col)=>{
        if(!mouseIs.pressed) return 
        let newGrid = null;
        if(mouseIs.StartOrEndNode){
            newGrid = changeStartNode(gridOneLocal,row,col,mouseIs.StartOrEndNode);
        }else{
            newGrid = wallToggle(gridOneLocal,row,col);
            addWallToggleVisualizationTwo(row,col)
        }
        setGridOneLocal(newGrid)
    }

    const onMouseUp= _=>{
        setMouseIs({
            startNode: false,
            pressed: false
        })
    }

    const addWallToggleVisualizationTwo = (row,col)=>{
        if(isVisualizationTwo){
            const newGridTwo = wallToggle(gridTwoLocal,row,col);
            setGridTwoLocal(newGridTwo)
        }
    }

    const wallToggle = (grid,row,col)=>{
        const newGrid = grid.slice()
        const node = newGrid[row][col];
        if(node.isWall === toggleWalls) return newGrid;
        const newNode = {...node,isWall: toggleWalls};
        newGrid[row][col] = newNode;
        return newGrid;
    }

    const changeStartNode = (grid,row,col,StartOrEndNode)=>{
        if(StartOrEndNode == "start-node"){
            STARTNODE = {row,col}
            setGridStartNode(STARTNODE)
            ENDNODE = gridEndNode
        }else{
            ENDNODE = {row,col}
            setGridEndNode(ENDNODE)
            STARTNODE = gridStartNode
        }
        const GRID = grid.slice()
        const newGrid = updateGridWalls(GRID,firstOrSecond,false,STARTNODE,ENDNODE)
        newGrid[row][col].isStart = StartOrEndNode == "start-node" ? true : false
        reRenderPath(newGrid)
        return newGrid
    }
    
    const reRenderPath = newGrid=>{
        if(isPath){
            const {visitedNodes,shortestWay} = firstOrSecond ? Dijkstran(newGrid) : aStart(newGrid)
            animationIsPath(visitedNodes,shortestWay,className)
        }
    }

    return (
        <>
            <div className="visualization" style={cssGrid} ref={visualizationRef} draggable="false">
                {
                gridOneLocal.map((row,indexRow)=>
                    row.map((node,indexCol)=>
                        <Node isStart={node.isStart} 
                            isFinish={node.isFinish} 
                            col={indexCol}
                            row={indexRow}
                            onMouseDown={onMouseDown}
                            onMouseEnter={onMouseEnter}
                            onMouseUp={onMouseUp}
                            isWall={node.isWall}
                            index={node.index}  
                            firstOrSecond={firstOrSecond}
                            key={`${indexRow}-${indexCol}`
                        }
                        />
                    )
                ) 
                }
            </div>
        </>
    )
}