import { useState } from "react";
import { useEffect } from "react";
import { SidebarbarVissibility } from "../store/togglevissibility"

import Header from "../components/header/header";
import Infocontainer from "../components/infocontainer/infocontainer";
import Sidebar from "../components/sidebar/sidebar";

export default function Info(props){
    const id=props.match.params.id
    const [data,setdata] = useState()
    const [dlc,setdlc]=useState()
    const [parent,setparent]=useState()
    const [sc,setsc]=useState()
    useEffect(()=>{
        fetch(`https://api.rawg.io/api/games/${id}?key=27cf0c31c04e48cd8f697a075768c534`)
        .then(resp => resp.json())
        .then((results) =>{ setdata(results)})
        fetch(`https://api.rawg.io/api/games/${id}/additions?key=27cf0c31c04e48cd8f697a075768c534`)
        .then(resp => resp.json())
        .then((results) => {setdlc(results.results)})
        fetch(`https://api.rawg.io/api/games/${id}/parent-games?key=27cf0c31c04e48cd8f697a075768c534`)
        .then(resp => resp.json())
        .then((results) => {setparent(results.results)})
        fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=27cf0c31c04e48cd8f697a075768c534&page_size=10`)
        .then(resp => resp.json())
        .then((results) => {console.log(results.results);setsc(results.results)})
    },[id])
    const style={backgroundImage:`url(${data ?data.background_image:''})`,backgroundSize:'cover',backgroundPosition:'center'}
    return (
        <SidebarbarVissibility>   
        <div className="info" style={style}>
            <div className="info_overlay">
                <div className="info_overlay_layer_2">
                <Header />
                <div className="flex">
                <Sidebar value={'info__sidebar'} />
                 <Infocontainer {...data} dlc={dlc} parent={parent} sc  ={sc}/>
                </div>
                </div>
            </div>
        </div>
        </SidebarbarVissibility>   

    )
}