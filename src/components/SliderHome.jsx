import { useCallback, useEffect, useState } from "react";
import Policy from "./Policy";
import policies from "../assets/data/policy";
import SliderHomeItem from './SliderHomeItem';

const SliderHome = (props) => {
    const { datas } = props;
    const [itemActive, setItemActive] = useState(0);

    const nextActive = useCallback(() => {
        let nextActiveIndex = itemActive === datas.length - 1 ? 0 : itemActive + 1;
        setItemActive(nextActiveIndex);
    });

    const preActive = useCallback(() => {
        let preActiveIndex = itemActive === 0 ? datas.length - 1 : itemActive - 1;
        setItemActive(preActiveIndex);
    })


    return (
        <div className="slider-home-container">
            <div className="slider-home-list">
                {datas && datas.length > 0 && datas.map((data, index) => (
                    <SliderHomeItem data={data} key={index} active={itemActive === index ? 'active' : ''} />
                ))}
            </div>
            <div className="slider-home-container-navigate-slide">
                <i className = 'bx bx-chevron-left slider-home-container-navigate-slide-icon-left' onClick={preActive}></i>
                <p className="slider-home-container-navigate-slide-content">{itemActive + 1}/{datas.length}</p>
                <i className="bx bx-chevron-right slider-home-container-navigate-slide-icon-right" onClick={nextActive}></i>
            </div>
            {/* {datas.map((data, index) => {
                <SliderHomeItem data={data} key={index}/>
            })} */}
        </div>
    )
}



export default SliderHome;
