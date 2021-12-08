import { Link } from "react-router-dom";

export default function Gamebox({view,id,name,genres,rating_top,
    playtime,ratings_count,parent_platforms,background_image,metacritic,released}){
    var platforms=[]
    parent_platforms && parent_platforms.forEach(element => {
        platforms.push(element.platform.name)
    });
    return(
        <div className={`gamebox__relative  ${view==='scroll'&& 'gamebox__scroll__view'}`}>
        <div className={`heroface__gameboxes ${view==='scroll'&& 'gamebox__scroll__view'}`}> 
                    <div className={`img_box ${view==='scroll'&& 'imgbox__scroll__view'}`}>
                        <img className="heroface__box__image" src={background_image} alt=''/>
                    </div>
                    <div className="platform__box">
                        <div className="heroface__platform">
                            {platforms.includes('PC') && <span class="heroface__platform__button pc"></span>}
                            {platforms.includes('PlayStation') &&<span class="heroface__platform__button playstation"></span>}
                            {platforms.includes('Xbox') && <span class="heroface__platform__button xbox"></span>}
                        </div>
                        <span className="heroface__rating">{metacritic || 94}</span>
                    </div>
                    <Link to={`/info/${id}`}><h2>{name}</h2></Link>
                    <div className="customize__button__box">
                        <button className="customize__button">+ {ratings_count}</button>
                        <button className="customize__button block">
                            <p class="discover-sidebar__link" href="/discover/wishlist">
                                <span class="SVGInline discover-sidebar__icon discover-sidebar__icon_wishlist">
                                    <svg class="SVGInline-svg discover-sidebar__icon-svg discover-sidebar__icon_wishlist-svg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path fill="#FFF" d="M25.5 9.846h-4.746a5.87 5.87 0 00.837-.657 3.027 3.027 0 000-4.32c-1.175-1.158-3.223-1.159-4.4 0-.649.639-2.375 3.24-2.137 4.977h-.108c.237-1.738-1.488-4.339-2.138-4.978-1.176-1.158-3.224-1.157-4.4 0a3.028 3.028 0 000 4.321c.205.203.498.429.838.657H4.5A1.487 1.487 0 003 11.314v3.672c0 .405.336.734.75.734h.75v8.812c.004.813.675 1.47 1.5 1.468h18a1.487 1.487 0 001.5-1.468V15.72h.75c.414 0 .75-.329.75-.734v-3.672a1.487 1.487 0 00-1.5-1.468zM9.472 5.904a1.61 1.61 0 011.138-.464c.427 0 .83.164 1.135.464 1.011.995 2.016 3.54 1.667 3.893 0 0-.064.048-.278.048-1.036 0-3.015-1.054-3.662-1.691a1.578 1.578 0 010-2.25zm4.778 18.628H6V15.72h8.25v8.812zm0-10.28H4.5v-2.938h9.75v2.938zm4.005-8.348c.609-.598 1.665-.597 2.273 0a1.578 1.578 0 010 2.25c-.647.637-2.626 1.692-3.662 1.692-.214 0-.278-.047-.279-.049-.348-.354.657-2.898 1.668-3.893zM24 24.532h-8.25V15.72H24v8.812zm1.5-10.28h-9.75v-2.938h9.75v2.938z"></path></svg>
                                </span>
                            </p>
                        </button>
                        <button className="customize__button block">
                            . . .
                        </button>
                    </div>
                    <ul className="block">
                        <li className="heroface__list__flex">
                            <span>
                                Release Date : 
                            </span>
                            <span>
                                {released}
                            </span>
                        </li>
                        <li className="heroface__list__flex">
                            <span>
                                Genres : 
                            </span>
                            <span>
                                {genres && genres.map((data)=>(
                                    data.name+', '
                                ))}
                            </span>
                        </li>
                        <li className="heroface__list__flex">
                            <span>
                                Chart : 
                            </span>
                            <span>
                                Top #{rating_top}
                            </span>
                        </li>
                    </ul>
                    <button className="customize__button bottom__button block">
                        Show More Like This
                    </button>
                    <button className="customize__button bottom__button block">
                        Hide This Game
                    </button>
                </div>
            </div>
    )
}