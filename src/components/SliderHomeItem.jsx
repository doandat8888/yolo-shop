import { Link } from "react-router-dom";

const SliderHomeItem = (props) => {
    let {data} = props;
    return (
        <div className={`slider-home-item-container ${props.active}`}>
            <div className="slider-home-item-container-left">
                <div className={`slider-home-item-container-left-title ${data.color}`}>
                    <p>{data.title}</p>
                </div>
                <div className="slider-home-item-container-left-content">
                    <p>{data.description}</p>
                </div>
                <Link to={data.path}>
                    <button className={`slider-home-item-container-left-button ${data.color}`}>
                        Xem chi tiết
                    </button>
                </Link>
            </div>
            <div className="slider-home-item-container-right">
                <span className={`slider-home-item-container-right-shape ${data.color}`}></span>
                <img className="slider-home-item-container-rigth-img" src={data.img}/>
            </div>
        </div>
    )
}

export default SliderHomeItem