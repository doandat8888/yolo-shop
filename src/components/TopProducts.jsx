import { useHistory } from "react-router-dom";
import formatNumber from "../utils/formatNumber";
import productService from "../services/productService";
const TopProducts = (props) => {
    let {datas, title, col} = props;
    //console.log("Data top products check: ", datas);
    const history = useHistory();
    const gotoBuyPage = async(slug) => {
        history.push(`/${slug}`);
        // let response = await productService.getProductBySlug(slug);
        // console.log("Product slug check: ", response.data);
    }
    return (
        <div className="top-products-container">
            <div className="top-products-container-title">
                <p className="top-products-container-title-content">{title ? title : ''}</p>
            </div>
            <div className="top-products-container-body">
                <div className="top-products-container-body-list">
                    {datas.map((data, index) => (
                        <div className={`top-products-container-body-item ${col}`} key={index}>
                            <img src={`${data.image01}`} className="top-products-container-body-item-img first"/>
                            <img src={`${data.image02}`} className="top-products-container-body-item-img second"/>
                            <div className="top-products-container-body-item-name">
                                {data.title}
                            </div>
                            <div className={`top-products-container-body-item-price ${col}`}>
                                <div className="top-products-container-body-item-price-new">{formatNumber(data.price)}</div>
                                <div className="top-products-container-body-item-price-old"><del>{formatNumber(399000)}</del></div>
                            </div>
                            <div className="top-products-container-body-item-view-detail">
                                <button className="top-products-container-body-item-view-detail-button" onClick={() => gotoBuyPage(data.slug)}>Chọn mua</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopProducts;