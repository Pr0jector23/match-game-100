
const Card = ({item, indx, handleClick, handleLoad}) => {

    const itemClass = item.state ? " active " + item.state : ""

    return (
        <div className = {"card" + itemClass} onClick = {() => handleClick(indx)}>
            <img src={item.img} alt={item.id}/>
        </div>
    )
}

export default Card