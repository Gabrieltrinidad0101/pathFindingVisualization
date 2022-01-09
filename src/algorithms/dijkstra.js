export const Dijkstran = (grid)=>{
    const {unvisitedNodes,startNode,endNode} = getNodes(grid)
    const visitedNodes = [];
    if(!startNode) return {visitedNodes,shortestWay: []}
    startNode.distance = 0;
    while(unvisitedNodes.length){
        sort(unvisitedNodes)
        const currentNode = unvisitedNodes.shift()
        if(currentNode.isWall && !currentNode.isFinish && !currentNode.isStart) continue
        if(currentNode.distance === Infinity) break
        visitedNodes.push(currentNode)
        currentNode.isVisited = true
        if(currentNode === endNode) break
        setDistance(grid,currentNode)
    }
    const dataPath = {
        visitedNodes,
        shortestWay: shortestWay(endNode)
    }
    return dataPath
}

const sort = unvisitedNodes=>{
    unvisitedNodes.sort((NodeA,NodeB)=>NodeA.distance - NodeB.distance )
}

const setDistance = (grid,currentNode)=>{
    const unvisitedNodes = getNeighbors(grid,currentNode)
    for(const neighbor of unvisitedNodes){
        neighbor.distance = currentNode.distance + 1
        neighbor.previoNode = currentNode
    }
}


const getNeighbors = (grid,currentNode)=>{
    let neighbors = []
    const {row,col} = currentNode;
    if(row > 0) neighbors.push(grid[row - 1][col])
    if(row < grid.length - 1)neighbors.push(grid[row + 1][col])
    if(col > 0) neighbors.push(grid[row][col - 1])
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}

const getNodes = grid=>{
    let unvisitedNodes = []
    let startNode = null
    let endNode = null
    for(const row of grid){
        for(const node of row){
            if(!startNode)
                startNode = node.isStart === true ? node : null
            if(!endNode)
                endNode = node.isFinish === true ? node : null
            unvisitedNodes.push(node)
            }
        }
    return {unvisitedNodes,startNode,endNode}
}

export const shortestWay =endNode=>{
    let current = endNode
    const way = []
    while(current !== null){
        way.unshift(current)
        current = current.previoNode
    }
    return way
}

