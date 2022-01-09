const mazeAnimation = (shortestWay,firstOrSecond,grid) => new Promise((res)=>{
    shortestWay.forEach((node,index)=>{
        setTimeout(() => {
            const ele1 = document.getElementById(`node-${firstOrSecond}-${node.row}-${node.col}`)
            ele1.style.backgroundColor = "rgb(0, 255, 213)"
            ele1.setAttribute("clear","true")
            const {row,col} = node
            grid[row][col].isWall = true
            if(index === shortestWay.length - 1) res(grid)
        }, index * 20);
    })
})

export default mazeAnimation