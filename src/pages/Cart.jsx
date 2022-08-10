import CartItem from '../components/CartItem';
import { useSelector} from 'react-redux';
import formatNumber from '../utils/formatNumber';
import Footer from '../components/Footer';
import productsMethod from '../assets/data/products';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import productService from '../services/productService';
import OrderModal from '../components/OrderModal';



const Cart = () => {
    const cartItems = useSelector((item) => item.cartItems.value);
    //console.log(cartItems);
    //const products = productsMethod.getDetailProduct(cartItems);
    const [products, setProducts] = useState([]);
    //const [totalQuantity, setTotalQuantity] = useState(products.reduce((accumulator, item) => accumulator + item.quantity, 0));
    const [totalQuantity, setTotalQuantity] = useState(0);
    //const [totalMoney, setTotalMoney] = useState(products.reduce((accumulator, item) => accumulator + (item.quantity * item.product.price), 0));
    const [totalMoney, setTotalMoney] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false)
    const history = useHistory();
    
    const gotoCatalog = () => {
        history.push('/catalog');
    }

    const handleBook = () => {
        if(cartItems.length <= 0) {
            alert('Bạn chưa có sản phẩm nào trong giỏ hàng. Vui lòng chọn sản phẩm')
        }else {
            //setIsOpenModal(true);
            history.push('/delivery');
        }
    }

    const onCloseModal = () => {
        setIsOpenModal(false);
    }

    useEffect(async () => {
        let response = await productService.getAllProduct();
        if(response && response.errCode === 0) {
            let products = response.data;
            for(let i = 0; i < products.length; i++) {
                products[i].colors = products[i].colors.split(', ');
                products[i].sizes = products[i].sizes.split(', ');
            }
            let productsDetail = productsMethod.getDetailProduct(products, cartItems)
            setProducts(productsDetail);
        }
        setTotalQuantity(products.reduce((accumulator, item) => accumulator + item.quantity, 0));
        setTotalMoney(products.reduce((accumulator, item) => accumulator + (item.quantity * item.product.price), 0));
    }, [products])

    return (
        <React.Fragment>
            <Header />
            <div className="cart-container">
                <div className="cart-container-body">
                    <div className="cart-container-body-left">
                        <div className="cart-container-body-left-title">Bạn đang có {totalQuantity} sản phẩm trong giỏ hàng</div>
                        <div className="cart-container-body-left-total">
                            <div className="cart-container-body-left-total-title">Thành tiền</div>
                            <div className="cart-container-body-left-total-money">{formatNumber(totalMoney)}</div>
                        </div>
                        <button className="cart-container-body-left-button bg-main" onClick={handleBook}>Đặt hàng</button>
                        <button className="cart-container-body-left-button bg-main" onClick={gotoCatalog}>Tiếp tục mua hàng</button>
                    </div>
                    <div className="cart-container-body-right">
                        {products && products.length > 0 && products.map((item, index) => (
                            <CartItem item={item} key={index}/>
                        ))}
                    </div>
                </div>
                <Footer />
                <OrderModal isOpenModal={isOpenModal} products={products} onCloseModal={onCloseModal} totalMoney={totalMoney}/>
            </div>
        </React.Fragment>
        
    )
}

export default Cart