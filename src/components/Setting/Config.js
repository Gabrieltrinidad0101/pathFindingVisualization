import "./Config.css"
import {Dijkstran} from "../../algorithms/dijkstra"
import { useGlobalContext } from "../../context/context"
import clearPath from "../help/clearPath"
import animtion from "../help/animation"
import updateGridWalls from "../help/updateGridWalls"
import recursiveDivision from "../../mazeAlgorithms/recursiveDivision"
import mazeAnimation from "../help/mazeAnimation"
import aStart from "../../algorithms/aStar"

export default function Config() {
    const {gridOne,gridTwo,setGridOne,setGridTwo,config,setConfig} = useGlobalContext()
    const {toggleWalls,isVisualizationTwo} = config

    const cap = document.querySelector(".cap")
    const Config= document.querySelector(".Config")


    const startAlgorithmo = async _=>{
        Config.classList.remove("active")
        cap.style.width = "100%"
        const newGridOne = updateGridWalls(gridOne,true)
        const newGridTwo = updateGridWalls(gridTwo,false)

        const pathOne = Dijkstran(newGridOne);
        const pathTwo = aStart(newGridTwo);

        const visitedNodesOne = pathOne.visitedNodes;
        const shortestWayOne = pathOne.shortestWay;

        const visitedNodesTwo = pathTwo.visitedNodes;
        const shortestWayTwo = pathTwo.shortestWay;

        await Promise.all([animtion(visitedNodesOne,shortestWayOne,"1"),
                     animtion(visitedNodesTwo,shortestWayTwo,"2")])
        setConfig({...config,isPath: true});
        cap.style.width = "0%"
    }

    const addOrRemoveWalls = _=>{
        Config.classList.remove("active")
        setConfig({...config,toggleWalls: !toggleWalls});
    }
    const visulizationTwo = _=>{
        Config.classList.remove("active")
        setConfig({...config,isVisualizationTwo: !isVisualizationTwo});
    }

    const clear = _=>{
        clearPath()
        setConfig({...config,isPath: false});
    }

    const clearAll = _=>{
        clear()
        const updateGridOne = updateGridWalls(gridOne,true,true)
        const updateGridTwo = updateGridWalls(gridTwo,false,true)
        return {updateGridOne,updateGridTwo}
    }

    const mazeRecursiveDivision = async _=>{
        Config.classList.remove("active")
        cap.style.width = "100%"
        
        const {updateGridOne,updateGridTwo} = clearAll()

        const maze1 = recursiveDivision(updateGridOne)
        const maze2 = recursiveDivision(updateGridTwo)
        
        const newGrid1 = gridOne.slice()
        const newGrid2 = gridTwo.slice()
        
        const res = await Promise.all([mazeAnimation(maze1,1,newGrid1),mazeAnimation(maze2,2,newGrid2)]) 
        
        setGridOne(res[0])
        setGridTwo(res[1])
        cap.style.width = "0%"

    }
    
    return (
        <div className="Config">
            <button className="startPath buttonConfig" onClick={_=>startAlgorithmo()}>Start</button>
            <button className="addOrRemove buttonConfig" onClick={_=>addOrRemoveWalls()}>{toggleWalls ? 
                <p>remove</p> :
                <p>add</p>}
            </button>
            <button className="two buttonConfig" onClick={_=>visulizationTwo()}>{isVisualizationTwo ? "One" : "Two"}</button>
            <button className="clearPath buttonConfig" onClick={_=>clear()}>Clear path</button>
            <button className="clearAll buttonConfig" onClick={_=>clearAll()}>Clear all</button>
            <button className="maze buttonConfig" onClick={_=>mazeRecursiveDivision()}>Maze</button>
        </div>
    )
}
