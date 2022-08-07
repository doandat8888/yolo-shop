import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import productsMethod from "../assets/data/products";
import formatNumber from "../utils/formatNumber";
import { useDispatch} from "react-redux";
import Button from "./Button";
import { addItems } from "../redux/cart-item/cartItemSlice";
import Header from "./Header";
import productService from "../services/productService";
const ProductView = () => {

    const { slug } = useParams();
    let productSlug = slug;
    const [productObj, setProductObj] = useState({});
    //const product = productsMethod.getProductBySlug(slug);
    const [imageData, setImageData] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [content, setContent] = useState('half');
    //const [borderColor, setBorderColor] = useState('');
    const [colorChoose, setColorChoose] = useState('');
    const [sizeChoose, setSizeChoose] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    
    
    
    

    const updateQuantity = (type) => {
        switch(type) {
            case 'UP':
                setQuantity(quantity + 1);
                break;
            case 'DOWN':
                setQuantity(quantity === 1 ? 1 : quantity - 1);
                break;
        }
        
    }

    const setContentHeight = () => {
        if(content === 'half') {
            setContent('');
        }else {
            setContent('half');
        }
    }

    const setChoose = (type, data) => {
        if(type === 'COLOR') {
            setColorChoose(data);
        }
        if(type === 'SIZE') {
            setSizeChoose(data);
        }
    }

    const onAddToCart = () => {
        if(!colorChoose) {
            alert('Vui lòng chọn màu sắc');
        }else if(!sizeChoose) {
            alert('Vui lòng chọn kích thước')
        }else {
            alert('Thêm vào giỏ hàng thành công');
            dispatch(addItems({
                color: colorChoose,
                quantity,
                size: sizeChoose,
                slug
            }))
        }
    }

    const onGoToCart = () => {
        if(!colorChoose) {
            alert('Vui lòng chọn màu sắc');
        }
        if(!sizeChoose) {
            alert('Vui lòng chọn kích thước')
        }else {
            dispatch(addItems({
                color: colorChoose,
                quantity,
                size: sizeChoose,
                slug
            }))
            history.push('/cart')
        }
    }

    useEffect(async() => {
        setProductObj({});
        setQuantity(1);
        setContent('half');
        setColorChoose('');
        setSizeChoose('');
        let response = await productService.getProductBySlug(slug);
        if(response && response.errCode === 0) {
            let result = response.data;
            result.colors = result.colors.split(', ');
            result.sizes = result.sizes.split(', ');
            setProductObj(result);
            setImageData(result.image01);
        }
        
    }, [slug]);

    

    return (
        <div className="product-view-container">
            <Header />
            <div className="product-view-container-top">
                <div className="product-view-container-top-body">
                    <div className="product-view-container-top-left">
                        <img src={productObj && productObj.image01 && productObj.image01} alt="image01" className="product-view-container-top-left-img" onClick={() => setImageData(productObj.image01)}/>
                        <img src={productObj && productObj.image02 && productObj.image02} alt="image02" className="product-view-container-top-left-img" onClick={() => setImageData(productObj.image02)}/>
                    </div>
                    <div className="product-view-container-top-middle">
                        <img src={imageData} alt="image3" className="product-view-container-top-middle-img"/>
                    </div>
                </div>
                <div className="product-view-container-top-right">
                    <div className="product-view-container-top-right-title">
                        <p className="product-view-container-top-right-title-content">{productObj && productObj.title ? productObj.title : ''}</p>
                    </div>
                    <div className="product-view-container-top-right-price">
                        <p className="product-view-container-top-right-price-content">{formatNumber(productObj && productObj.price ? productObj.price : '')}</p>
                    </div>
                    <div className="product-view-container-top-right-color">
                        <p className="product-view-container-top-right-color-title">Màu sắc</p>
                        <div className="product-view-container-top-right-color-body">
                            {productObj && productObj.colors && productObj.colors.map((color, index) => (
                                <div className={`product-view-container-top-right-color-body-item ${colorChoose === color ? 'main' : ''}`} key={index} onClick={() => setChoose('COLOR', color)}>
                                    <div className={`product-view-container-top-right-color-body-item-content bg-${color}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product-view-container-top-right-size">
                        <p className="product-view-container-top-right-size-title">Kích thước</p>
                        <div className="product-view-container-top-right-size-body">
                            {productObj && productObj.sizes && productObj.sizes.map((size, index) => (
                                <div className={`product-view-container-top-right-size-body-item ${size === sizeChoose ? 'main' : ''}`} key={index} onClick={() => setChoose('SIZE', size)}>
                                    <div className={`product-view-container-top-right-size-body-item-content`}>{size}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="product-view-container-top-right-quantity">
                        <p className="product-view-container-top-right-quantity-title">Số lượng</p>
                        <div className="product-view-container-top-right-quantity-body">
                            <div className="product-view-container-top-right-quantity-body-item-left" onClick={() => updateQuantity("DOWN")}><i className = 'bx bx-minus'></i></div>
                            <div className="product-view-container-top-right-quantity-body-item-middle">{quantity}</div>
                            <div className="product-view-container-top-right-quantity-body-item-right" onClick={() => updateQuantity("UP")}><i className = 'bx bx-plus'></i></div>
                        </div>
                    </div>
                    <div className="product-view-container-top-right-button">
                        <button className="product-view-container-top-right-button-item bg-main" onClick={onAddToCart}>Thêm vào giỏ</button>
                        <button className="product-view-container-top-right-button-item bg-main" onClick={onGoToCart}>Mua ngay</button>
                    </div>
                </div>
            </div>
            <div className="product-view-container-bottom">
                <div className="product-view-container-bottom-title">Chi tiết sản phẩm</div>
                <div className="product-view-container-bottom-body">
                    <div className={`product-view-container-bottom-content ${content}`} dangerouslySetInnerHTML = {{__html: productObj.contenthtml}}></div>
                    <div className="product-view-container-bottom-button">
                        <button className="product-view-container-bottom-button-content bg-main" onClick={setContentHeight}>{content === 'half' ? 'Xem thêm' : 'Thu gọn'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView;