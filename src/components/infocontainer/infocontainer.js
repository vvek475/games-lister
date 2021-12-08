import { useEffect, useState } from "react"
import Gamebox from "../gamebox/gamebox"

export default function Infocontainer({suggestions_count,tags,screenshots_count,
    rating_top,publishers,name,released,website,stores,dlc,parent,sc,
    dominant_color,platforms,playtime, description_raw, background_image, developers, metacritic, updated,background_image_additional}){
    var platform_detail=[]
    platforms?platforms.forEach(element => {
        platform_detail.push(element.platform.name+', ')
    }):console.log('')
    const [visibility,setvisibility] = useState(false)
    var stores_list=[]
    stores?stores.forEach(element => {
        stores_list.push(element.store.name)
    }):console.log()
    var tags_list=[]
    tags?tags.forEach(element => {
        tags_list.push(element.name)
    }):console.log()
    const [video,setvideo] = useState()
    useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyA_-LXw_UXBgaAptQx3ZXk-gL-68w4XIVw&type=video&order=viewcount&q=${name}trailer%english`)
    .then(resp => resp.json())
    .then((results) => {console.log('results',results);setvideo(results)})
    },[name])
    const [about,setabout]=useState('Read more')
    const [scvis,setscvis]=useState('more...')
    const style={backgroundImage:`url(${background_image ?background_image:''})`,backgroundSize:'cover'}
    return(
        <div className="infocontainer">
            <p className="pagination">HOME/GAMES/{name}</p>
            <div className="flex infocontainerblock">
                <div className="infocontainer_content">
                    <p className="infocontainer_platform_box flex">
                        <span className="infocontainer__release"> {released} </span>
                        <span class="heroface__platform__button pc"></span>
                        <span class="heroface__platform__button xbox"></span>
                        <span class="heroface__platform__button playstation"></span>
                    </p>
                    <p className="infocontainer_title">
                        {name}
                    </p>
                    <p className="infocontainer__ratings flex">
                        <span>Not Rated Yet</span>
                        <span>#{suggestions_count}</span>
                        <span>#{rating_top}</span>
                    </p>
                    <span className="infocontainer__review">
                        <button className="mobiledisappear">+ Write a Review</button>
                        <button className="mobiledisappear">+ Write a Comment</button>
                    </span>


                    <div onClick={()=>setvisibility(true)} className="imgcover mobileappear" style={style}>
                    <img alt="play" className="playbutton" src='https://i.postimg.cc/G24qYjyR/play-button.png'/></div>

                    
                    
                    <div className="infocontainer_img_box flex mobileappear">
                    <a target="blank" href={background_image}><img src={background_image} alt="imge"/></a>
                        <a target="blank" href={background_image_additional}><img src={background_image_additional} alt="imge"/></a>
                        {scvis==='less' && sc && sc.map((img)=>(
                            <a target="blank" href={img.image}><img alt="InGameSC"src={img.image}/></a>
                        ))}
                        <p>more...<br/>{screenshots_count}+</p>
                    </div>

                    {visibility && <div onClick={()=>setvisibility(false)} className="overlay_trailer_blur">
                       {(video && video.items.length>0)?(<iframe title={name} className="overlay__trailer__iframe" src={`https://www.youtube.com/embed/${video.items[0].id.videoId}`}/>):''}</div>}
                    <h1>About</h1>
                    <p className={`infocontainer__about ${about==='Read more'?'':'about_height'}`}>{description_raw}</p>
                    <span onClick={()=>setabout(about==='Read more'?'Read less':'Read more')} className='about__more mobileappear'>{about}</span>
                    <div className="infocontainer__tags flex">
                        <p className='mobiledisappear__block'>Platforms <br/><span class="tags__bold">{platform_detail}</span></p>
                        <p>Genre<br/><span class="tags__bold">Shooter</span></p>
                        <p>Release date<br/><span class="tags__bold">{released}</span></p>
                        {developers && <p>Developer<br/><span class="tags__bold">{developers[0].name}</span></p>}
                        {publishers && <p>Publisher<br/><span class="tags__bold">{publishers[0].name}</span></p>}
                        <p>Playtime<br/><span class="tags__bold">{playtime}</span></p>
                        <p></p>
                        <p>Website<br/><span class="tags__bold">{website}</span></p>
                    </div>
                    {platform_detail.map((data)=>(
                        <h2 className='mobiledisappear'>System Requirements For {data}</h2>
                    ))}
                    
                </div>
                <div className="infocontainer_content_right">
                    <div onClick={()=>setvisibility(true)} className="imgcover" style={style}>
                    <img alt="play" className="playbutton" src='https://i.postimg.cc/G24qYjyR/play-button.png'/></div>
                        
                    <div className="infocontainer_img_box flex">
                    <p>Click to view</p>
                        <a target="blank" href={background_image}><img src={background_image} alt="imge"/></a>
                        <a target="blank" href={background_image_additional}><img src={background_image_additional} alt="imge"/></a>
                        {scvis==='less' && sc && sc.map((img)=>(
                            <a target="blank" href={img.image}><img alt="InGameSC"src={img.image}/></a>
                        ))}
                        <p onClick={()=>setscvis(scvis==='more...'?'less':'more...')}>{scvis}<br/>{screenshots_count}+</p>
                    </div>
                        <button className="infocontainer__edit__button">Edit Game Info</button>
                        <p className="last_updated">Last Modified : {updated}</p>
                        <h2>Available at : </h2>
                        <br/><br/>
                        <div className="stores flex">
                        {stores_list && (stores_list.map((data)=>(<span>{data}</span>)))}
                        </div>
                        <br/><br/>
                        <h2>Tags</h2>
                        <br/><br/>
                        <div className="pill_list flex">
                        {tags_list && tags_list.map((tags)=>(<span>{tags}</span>))}
                    </div>
                </div>
            </div>
            <br/>
            {(dlc ||parent) && <> <h1 className="relation_header">{parent && parent.length>0&&`Parent of ${name}`}{dlc&&dlc.length>0 &&`${name}'s DLCs`}</h1>
            <div className="flex relation_container">
                {dlc && dlc.map((data)=>(
                   <Gamebox {...data}/>

                ))}
                {parent && parent.map((data)=>(
                   <Gamebox {...data}/>
                    
                ))}

            </div></>}
        </div>
    )
}