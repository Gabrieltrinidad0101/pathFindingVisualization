const clearPath = _=>{
    const nodes = document.querySelectorAll(`div[clear="true"]`)
    nodes.forEach(node=>{
        node.style.background = ""
        node.classList.remove("visited-node")
        node.classList.remove("path-node")
        node.classList.remove("clear")
    })
}

export default clearPath