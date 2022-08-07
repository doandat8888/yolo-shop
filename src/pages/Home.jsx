import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dataSlider from "../assets/data/slider.js";
import policies from "../assets/data/policy.js";
import SliderHome from "../components/SliderHome.jsx";
import Policy from "../components/Policy";
import TopProducts from "../components/TopProducts";
import products from "../assets/data/products";
import productsMethod from "../assets/data/products";
import Banner from "../components/Banner";
import productService from "../services/productService";
const Home = () => {

    let [products, setProducts] = useState([]);

    useEffect(async() => {
        let response = await productService.getAllProduct();
        if(response && response.errCode === 0) {
            setProducts(response.data);
        }
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="home-container">
                <SliderHome datas={dataSlider}/>
                <Policy datas={policies}/>
                <TopProducts datas={productsMethod.getProductByAmount(products, 4)} title={'Top sản phẩm bán chạy trong tuần'} col={'quater'}/>
                <TopProducts datas={productsMethod.getProductByAmount(products, 8)} title={'Sản phẩm mới'} col={'quater'}/>
                <Banner />
                <TopProducts datas={productsMethod.getProductByAmount(products, 12)} title={'Phổ biến'} col={'quater'}/>
                <Footer />
            </div>
        </React.Fragment>
        
    )
}

export default Home;