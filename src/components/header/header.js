import { useContext,useState} from "react"
import { Link } from "react-router-dom"
import SidebarVissibilityContext from "../../store/togglevissibility"

export default function Header(){
    const [,,Togglevisibility]=useContext(SidebarVissibilityContext)
    const [result,setresult] = useState()
    const [search,setsearch]=useState()
    const API_KEY='key=27cf0c31c04e48cd8f697a075768c534'


    function Search(e){
        const tosearch=search.split(' ').join('-').toLowerCase()
        e.preventDefault()
        fetch(`https://api.rawg.io/api/games/${tosearch}?${API_KEY}`)
        .then(resp => resp.json())
        .then((results) =>{setresult(results);console.log(results)})
        
    }
    return (
        <div className="header">
            <button onClick={Togglevisibility} className="toggle_header_button">&#9776;</button>
            <span className="logo">
                GAME LISTER
            </span>
            <form  className="mobiledisappear" onSubmit={Search}>
            <input className="search__input" value={search} onChange={(e)=>setsearch(e.target.value)} placeholder="Search 651,642 games"/>
            </form>
            <span className="userpic">U</span> 
            <p>My Library</p>
            <p className="header__bold">+</p>
            {result && search.length > 0 && (result.redirect?<div className="searchResult"> 
                <h2>Did u mean <Link to={`/info/${result.slug}`}>{result.slug.split('_').join(' ')}</Link> ?</h2></div>
            :result.detail==='Not found.'? 
            <div className="searchResult"> 
                <h2>Please Check your spelling !!!</h2></div>
            :<Link to={`/info/${result.slug}`}><div className="searchResult">
                 <div className="searchResult__img__box">
                     <img src={result && result.background_image} alt={result && result.name} className="searchResult__img"/><br/>
                     <span>{result.released}</span><br/>
                     <span className="heroface__rating">{result.metacritic || 94}</span>
                </div>
                <div className="searchResult__overview">
                    <h2>{result && result.name}</h2>
                    <p>{result && result.description_raw} </p>
                </div>
            </div></Link>)}
        </div>
    )
}