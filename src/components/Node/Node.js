import React from 'react'
import "./Node.css"
import isFirstOrSecond from '../help/isFirstOrSecond';
export default function Node({isStart, isFinish, row,col,onMouseDown,
                              onMouseEnter,onMouseUp,isWall,firstOrSecond}) {
    const typeNode = isStart 
                           ? "start-node" : 
                           isFinish ? 
                           "end-node" : 
                           isWall ?
                           "is-wall" : "" ; 
    
    const className = isFirstOrSecond(firstOrSecond)
    return (
        <div className={`node ${typeNode}`}
             id={`node-${className}-${row}-${col}`}
             onMouseDown={_=>onMouseDown(row,col,typeNode)}
             onMouseEnter={_=>onMouseEnter(row,col)}
             onMouseUp={_=>onMouseUp()}
             onTouchStart={_=>onMouseDown(row,col,typeNode)}
             onTouchMove={_=>onMouseEnter(row,col)}
             onTouchEnd={_=>onMouseUp()}
             draggable="false"
             >
        </div>
    )
}
