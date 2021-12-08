import { createContext ,useState } from 'react';

const SidebarVissibilityContext=createContext()

export function SidebarbarVissibility({children}){
    const [visibility,setvisibility]=useState(true)
    function Togglevisibility(){
        setvisibility((state)=>state?false:true)
    }
    return (
        <SidebarVissibilityContext.Provider value={[visibility,setvisibility,Togglevisibility]}>
            {children}
        </SidebarVissibilityContext.Provider>
    )
}
export default SidebarVissibilityContext
