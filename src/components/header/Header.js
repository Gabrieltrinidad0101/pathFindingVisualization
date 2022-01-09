import React from 'react'
import "./header.css"
export default function Header() {
    const Config = _=>{
        const config= document.querySelector(".Config")
        config.classList.toggle("active")
    }
    return (
        <div className="header">
            <button onClick={_=>Config()}><i className="fas fa-bars"></i></button>
            <p>
                Dijkstra Vs A*
            </p>
        </div>
    )
}
