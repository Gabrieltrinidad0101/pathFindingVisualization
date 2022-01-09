import createNode from "./createNode";
const getInicialGrid = (rows,cols,STARTNODE,ENDNODE)=>{
    const grid = [];
    for(let row = 0; row < rows; row++){
        let currentRow = []
        for(let col = 0; col < cols; col++){
            currentRow.push(createNode(row,col,STARTNODE,ENDNODE))
        }
        grid.push(currentRow)
    }
    return grid
}

export default getInicialGrid