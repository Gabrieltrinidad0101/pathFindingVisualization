const animation = (visitedNodes,shortestWay,firstOrTwo)=> new Promise((res)=>{
        if(!visitedNodes) return
        visitedNodes.forEach((node,index)=>{
            if(index === visitedNodes.length -1){
                setTimeout(async() => {
                    await createPathAnimation(shortestWay,firstOrTwo)
                    res(true)
                }, index/2);
            }
            setTimeout(() => {
                const ele = document.getElementById(`node-${firstOrTwo}-${node.row}-${node.col}`)
                ele.classList.add("visited-node")
                ele.setAttribute("clear","true")
            }, index/2);
        })
    }
)

const createPathAnimation = (shortestWay,firstOrTwo) =>new Promise((res)=>{
    shortestWay.forEach((node,index)=>{
        setTimeout(() => {
            const ele = document.getElementById(`node-${firstOrTwo}-${node.row}-${node.col}`)
            if(ele === null) return console.log(node)
            ele.classList.add("path-node")
            ele.setAttribute("clear","true")
            if(index === shortestWay.length - 1) res(true)
        }, index * 50);
    })
})

export default animation
