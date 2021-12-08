import Gamebox from "../gamebox/gamebox";
import {useState,useEffect} from 'react'
export default function Heroface(){
    const [data,setdata] = useState()
    const [view,setview] = useState('grid')
    const [gamescount,setgamescount]=useState(15)
    const [page,setpage]=useState(1)
    const [order,setorder]=useState('Relevance')
    const API_KEY='key=27cf0c31c04e48cd8f697a075768c534'
    useEffect(()=>{
        fetch(`https://rawg.io/api/games?${API_KEY}&page_size=${gamescount}&page=${page}`)
        .then(resp => resp.json())
        .then(({results}) => {setdata(results);console.log(results)})
    },[API_KEY,gamescount,page])

    

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    data && data.reverse()
    function reversed(){
        fetch(`https://rawg.io/api/games?${API_KEY}&page_size=${gamescount}&page=${page}`)
        .then(resp => resp.json())
        .then(({results}) => {setdata(results.reverse());console.log(results)})
        setdata(data.reverse())
        console.log(data)
    }
    return(
        <div className="heroface__box">
            <h1 className="heroface__title">New and trending</h1>
            <p>Based on player counts and release date</p>
            <div className="heroface__header">
                <div className="hover__display">
                <button className="heroface__toggle__button">
                    Order By : <span className="heroface__toggle__order">{order}</span>
                </button>
                <button onClick={()=>reversed()} className="heroface__toggle__button">
                    Reverse
                </button>
                    <div className="order__list">
                        <span onClick={()=>{setorder('Name');data.sort(dynamicSort('name'))}} className="order__items">Name  
                            {order==='Name'&&<span> &#10003;</span>}
                        </span>
                        <span onClick={()=>{setorder('Rating');data.sort(dynamicSort('metacritic'));data.reverse()}} className="order__items">Rating 
                            {order==='Rating'&&<span> &#10003;</span>}
                        </span>
                        <span onClick={()=>setorder('Relevance')} className="order__items">Relevance 
                            {order==='Relevance'&&<span> &#10003;</span>}
                        </span>
                        <span onClick={()=>{setorder('Date');data.sort(dynamicSort('released'));data.reverse()}} className="order__items">Date 
                            {order==='Date'&&<span> &#10003;</span>}
                        </span>
                    </div>
                    </div>
                <div className="hero__view">
                    <p>Display options : </p>
                    <span onClick={()=>setview('grid')} className={`grid__view ${view==='grid' && 'opacity__full'}`}></span>
                    <span onClick={()=>setview('scroll')} className={`scroll__view ${view==='scroll' && 'opacity__full'}`}></span>
                </div>
            </div>
            <div className={`heroface__content ${view}`} >
                {data && data.map((datas)=>{
                    console.log(data)
                    return <Gamebox {...datas} view={view}/>
                    })}
            </div>
            <div className="page_toggle">
            <button onClick={()=>(setpage(page>1?page-1:page))} className="page__btn">Prev</button>
            <button onClick={()=>(setpage(page+1))} className="page__btn">Next</button>
            </div>
            <button onClick={()=>(setgamescount(gamescount+5))} className="more__games">More Games</button>
        </div>
    )
}