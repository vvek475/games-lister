import Header from "../components/header/header"
import Hero from "../components/hero/hero"
import { SidebarbarVissibility } from "../store/togglevissibility"

export default function Home(){
    return(
        <>
            <SidebarbarVissibility>   
                <Header/>
                <Hero/>
            </SidebarbarVissibility> 
        </>
    )
}