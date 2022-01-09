import createNode from "./createNode";
import isFirstOrSecond from "./isFirstOrSecond";
const updateGridWalls = (grid,firstOrSecond,updateWalls,STARTNODE,ENDNODE)=>{
    const newGrid = [];
    const className = isFirstOrSecond(firstOrSecond)
    grid.forEach((row,indexRow)=>{
        const currentRow = []
        row.forEach((node,indexCol)=>{
            const nodeHtml = document.getElementById(`node-${className}-${indexRow}-${indexCol}`)
            nodeHtml.style.background = ""
            nodeHtml.classList.remove("visited-node")
            nodeHtml.classList.remove("path-node")
            nodeHtml.setAttribute("clear","false")
            if(!STARTNODE && node.isStart){
                STARTNODE = node
            }

            if(!ENDNODE && node.isFinish){
                ENDNODE = node
            }

            if(updateWalls){
                node.isWall = false
            }

            currentRow.push(createNode(indexRow,indexCol,STARTNODE,ENDNODE,node.isWall,node.index))
        })
        newGrid.push(currentRow)
    })
    return newGrid
}

export default updateGridWalls