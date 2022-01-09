import React from 'react'
import Visualization from '../visualization/Visualization'
import "./ContainerVisualizations.css"
import { useGlobalContext } from '../../context/context'
export default function ContainerVisualizations() {
    const {gridOne, setGridOne,gridTwo,setGridTwo} = useGlobalContext()

    return (
        <div className="ContainerVisualizations">
            <Visualization firstOrSecond={true} gridOne={gridOne} 
                                                setGridOne={setGridOne}
                                                gridTwo={gridTwo}
                                                setGridTwo={setGridTwo}/>
             <Visualization firstOrSecond={false} gridOne={gridTwo} 
                                                  setGridOne={setGridTwo}
                                                  gridTwo={gridOne}
                                                  setGridTwo={setGridOne} />
        </div>
    )
}