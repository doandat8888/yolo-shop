import ProductView from "./ProductView";
import Footer from "./Footer";
import TopProducts from "./TopProducts";
import { useEffect } from "react";
import productsMethod from '../assets/data/products';
import productService from "../services/productService";
import { useState } from "react";
const ProductDetail = () => {
    let [products, setProducts] = useState([]);
    useEffect(async() => {
        let response = await productService.getAllProduct();
        if(response && response.errCode === 0) {
            setProducts(response.data);
        }
    }, [])
    //const datas = productsMethod.getProductByAmount(8);
    return (
        <div className="product-detail-container">
            <ProductView />
            <TopProducts datas={productsMethod.getProductByAmount(products, 8)} title="Khám phá thêm" col='quater'/>
            <Footer />
        </div>
    )
}

export default ProductDetail;