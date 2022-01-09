const walls = [];
let count = 0;
export default function recursiveDivision(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
      return false;
    }
    const vertical = range(grid)
    const horizontal = range(grid[0])
    getRecursiveDivision(vertical,horizontal)
    return walls
}

const range = grid =>{
    let result = []
    for(let i = 0; i< grid.length; i++)
        result.push(i)
     return result
}


const getRecursiveDivision = (vertical,horizontal)=>{
    count++
    if(count > 50) return
    console.log(horizontal)
    if(vertical.length < 2 || horizontal.length < 2)
      return
    let dir;
    let rowOrCol;
    if(vertical.length > horizontal.length){
      dir = false;
      rowOrCol = RandomNumer(vertical)
    }
    if(vertical.length <= horizontal.length){
      dir = true;
      rowOrCol = RandomNumer(horizontal)
    }
    if(dir){
      addWalls(rowOrCol,dir,vertical,horizontal)
      getRecursiveDivision(
        vertical,
        horizontal.slice(0,vertical.indexOf(rowOrCol)),
      )
      getRecursiveDivision(
        vertical,
        horizontal.slice(vertical.indexOf(rowOrCol) + 1),
      )
    }else{
      addWalls(rowOrCol,dir,vertical,horizontal)
      getRecursiveDivision(
        vertical.slice(0,vertical.indexOf(rowOrCol)),
        horizontal,
      )
      getRecursiveDivision(
        vertical.slice(vertical.indexOf(rowOrCol)+1),
        horizontal,
      )
    }
}

const RandomNumer = (array) =>{
    let max = array.length - 1;
    let randomNum =
      Math.floor(Math.random() * (max / 2)) +
      Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 === 0) {
      if (randomNum === max) {
        randomNum -= 1;
      } else {
        randomNum += 1;
      }
    }
    return array[randomNum]
}

const addWalls = (rowOrCol,dir,vertical,horizontal)=>{
    const direction = dir ? vertical : horizontal
    direction.forEach(i =>{
      if(rowOrCol === 2) return
      const row = dir ? i : rowOrCol
      const col = dir ? rowOrCol : i
      walls.push({row,col})
    })
    walls.splice(generateRandomNumber(direction.length),1)
}


function generateRandomNumber(max) {
    let randomNum =
      Math.floor(Math.random() * (max / 2)) +
      Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 !== 0) {
      if (randomNum === max) {
        randomNum -= 1;
      } else {
        randomNum += 1;
      }
    }
    return randomNum;
}


