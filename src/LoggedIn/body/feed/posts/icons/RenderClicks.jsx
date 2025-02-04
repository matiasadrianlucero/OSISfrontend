import clicks from "../../../img/clicks.svg"
export default function RenderClicks(){
    return (
        <>
        <button className="likeButton"><img src={clicks} className="thumbsUp"></img></button>
        </>
    )
}