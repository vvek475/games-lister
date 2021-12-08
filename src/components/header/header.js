import { useContext } from "react"
import SidebarVissibilityContext from "../../store/togglevissibility"

export default function Header(){
    const [,,Togglevisibility]=useContext(SidebarVissibilityContext)
    return (
        <div className="header">
            <button onClick={Togglevisibility} className="toggle_header_button">&#9776;</button>
            <span className="logo">
                GAME LISTER
            </span>
            <input className="search__input" placeholder="Search 651,642 games"/>
            <span className="userpic">U</span> 
            <p>My Library</p>
            <p className="header__bold">+</p>
            <p>API</p>
        </div>
    )
}