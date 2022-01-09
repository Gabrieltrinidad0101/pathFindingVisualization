let walls;
const recursiveDivision = (grid)=>{
    let vertical = range(grid[0].length)
    let horizontal = range(grid.length)
    walls = [];
    getRecursiveWalls(vertical,horizontal)
    return walls
}

const range = len =>{
    let result = []
    for(let i = 0; i< len; i++)
        result.push(i)
     return result
}

const getRecursiveWalls = (vertical,horizontal)=>{
    if (vertical.length < 2 || horizontal.length < 2) {
        return;
    }
    let dir;
    let row;
    if(vertical.length > horizontal.length){
        dir = false;
        row = RandomNumer(vertical)
    }
    if(vertical.length <= horizontal.length){
        dir = true;
        row = RandomNumer(horizontal)
    }
    if(dir){
        addWall(dir,row,vertical,horizontal)
        getRecursiveWalls(
          vertical,
          horizontal.slice(0, horizontal.indexOf(row)),
          );
        getRecursiveWalls(
          vertical,
          horizontal.slice(horizontal.indexOf(row) + 1),
        );
    }else{
        addWall(dir,row,vertical,horizontal)
        getRecursiveWalls(
            vertical.slice(0, vertical.indexOf(row)),
            horizontal,
        );
        getRecursiveWalls(
            vertical.slice(vertical.indexOf(row) + 1),
            horizontal,
        );
    }
}

const addWall = (dir,row,vertical,horizontal)=>{
    let tempWalls = []
    if(!dir){
        if(horizontal.length === 2) return
        for(let temp of horizontal){
            tempWalls.push({"row": temp, "col": row});
        }
    }else{
        if(vertical.length === 2) return
        for(let temp of vertical){
            tempWalls.push({row, "col": temp});
        }
    }
    tempWalls.splice(generateRandomNumber(tempWalls.length),1)
    for(let wall of tempWalls){
        walls.push(wall)
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

export default recursiveDivision