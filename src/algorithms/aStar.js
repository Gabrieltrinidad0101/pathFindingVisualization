const aStart = (grid)=>{
    let unvisitedNodes = [];
    let visitedNodesInOrder = [];
    const {startNode,finishNode} = getStartAndEndNode(grid)
    if(!startNode || !finishNode) return {
        visitedNodes: [],
        shortestWay: []
    }
    startNode.distance = 0;
    unvisitedNodes.push(startNode)

    while(unvisitedNodes.length > 0){
        unvisitedNodes.sort((a,b)=>a.totalDistance - b.totalDistance)
        let currentNode = unvisitedNodes.shift()
        if(currentNode.isWall && !currentNode.isFinish && !currentNode.isStart) continue
        visitedNodesInOrder.push(currentNode)
        if(currentNode === finishNode)break
        currentNode.isVisited = true
        let neighbors = getNeighbors(grid,currentNode)
        for(let neighbor of neighbors){
            let distance = currentNode.distance + 1
            if(!unvisitedNodes.includes(neighbor)){
                unvisitedNodes.unshift(neighbor)
                neighbor.distance = distance
                neighbor.totalDistance = distance + manhattenDistance(neighbor,finishNode)
                neighbor.previoNode = currentNode
            }else if(distance < neighbor.distance){
                neighbor.distance = distance
                neighbor.totalDistance = distance + manhattenDistance(neighbor,finishNode)
                neighbor.previoNode = currentNode
            }
        }
    }
    const dataPath={
        visitedNodes: visitedNodesInOrder,
        shortestWay: shortestWay(finishNode)
    }
    return dataPath
}


const manhattenDistance = (node,finishNode)=>{
    let x = Math.abs(node.row - finishNode.row)
    let y = Math.abs(node.col - finishNode.col)
    return x+y
}


const getStartAndEndNode = grid=>{
    let startNode;
    let finishNode;
    for(const row of grid){
        for(const node of row){
            const {isStart,isFinish} = node
            if(isStart) startNode = node
            if(isFinish) finishNode = node
        }
    }
    return {startNode,finishNode}
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

export const shortestWay =endNode=>{
    let current = endNode
    const way = []
    while(current !== null){
        way.unshift(current)
        current = current.previoNode
    }
    return way
}

export default aStart