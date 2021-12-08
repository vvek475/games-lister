import Heroface from "../heroFace/heroFace";
import Sidebar from "../sidebar/sidebar";

export default function Hero(){
    return(
        <div className="hero">
            <Sidebar/>
            <Heroface/>
        </div>
    )
}