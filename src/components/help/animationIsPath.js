const animationIsPath = (visitedNodes,shortestWay,className)=>{
    if(!visitedNodes) return
    visitedNodes.forEach((node,index)=>{
        if(index === visitedNodes.length -1){
            createPathAnimation(shortestWay,className)
        }
        const ele = document.getElementById(`node-${className}-${node.row}-${node.col}`)
        ele.style.backgroundColor = "#275683"
        ele.setAttribute("clear","true")
    })
}

export const createPathAnimation = (shortestWay,className) =>{
    shortestWay.forEach((node)=>{
        const ele = document.getElementById(`node-${className}-${node.row}-${node.col}`)
        ele.style.backgroundColor = "#48a3fd"
        ele.setAttribute("clear","true")
    })
}

export default animationIsPath