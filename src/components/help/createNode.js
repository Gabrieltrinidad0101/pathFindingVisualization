const createNode = (row,col,STARTNODE={},ENDNODE={},isWall=false)=>{
    const node = {
        row,
        col,
        isStart: row === STARTNODE.row && col === STARTNODE.col,
        isFinish: row === ENDNODE.row && col === ENDNODE.col,
        isWall,
        totalDistance: Infinity,
        distance: Infinity,
        previoNode: null,
        isVisited: false,
    }
    return node;
}


export default createNode