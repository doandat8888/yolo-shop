import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import provinceService from "../services/provinceService";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import productService from "../services/productService";
import productsMethod from "../assets/data/products";
import CartItem from '../components/CartItem';
import formatNumber from "../utils/formatNumber";
import { useHistory } from "react-router-dom";
import vouchers from "../assets/data/voucher";
import orderService from "../services/orderService";
import detailOrderService from "../services/detailOrderService";

const DeliveryInfo = () => {

    const cartItems = useSelector((item) => item.cartItems.value);
    let [products, setProducts] = useState([])
    let [cities, setCities] = useState([]);
    let [districts, setDistricts] = useState([]);
    let [wards, setWards] = useState([]);
    let [selectedCity, setSelectedCity] = useState('');
    let [selectedDistrict, setSelectedDistrict] = useState('');
    let [selectedWard, setSelectedWard] = useState('');
    const [totalMoney, setTotalMoney] = useState(0);
    let [voucherCode, setVoucherCode] = useState('');
    let [discount, setDiscount] = useState('');
    let [totalPrice, setTotalPrice] = useState(0);
    let history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [roadName, setRoadName] = useState('');
    

    const handleOnClick = () => {
        history.push('/catalog')
    }

    const handleDiscount = () => {
        let voucherToDiscount = vouchers.find((voucher) => voucher.code === voucherCode);
        if(voucherToDiscount) {
            let discount = voucherToDiscount.value;
            //console.log(discount / 100);
            let total = totalMoney - ((discount / 100) * totalMoney);
            setTotalPrice(total);
            setDiscount(voucherToDiscount.display);
        }
    }

    const onCloseModal = () => {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setTotalPrice('');
        setSelectedCity('');
        setSelectedDistrict('');
        setSelectedWard('');
        setRoadName('');
        setTotalMoney('');
        setDiscount('');
        setProducts([]);
        history.push('/catalog');
    }

    const handleCheckout = async() => {
        if(!firstName || !lastName || !email || !phoneNumber || !selectedCity || !selectedDistrict || !selectedWard || !roadName) {
            alert('Vui l??ng nh???p ????? th??ng tin');
        }else {
            let address = roadName + ', ' + selectedWard + ', ' + selectedDistrict + ', ' + selectedCity;
            console.log("Full address check: ", address);
            let id = 0;
            let response = await orderService.getAllOrder();
            if(response && response.errCode === 0) {
                id = response.data.length + 1;
                let dataBills = {};
                dataBills.id = id;
                dataBills.firstName = firstName;
                dataBills.lastName = lastName;
                dataBills.phoneNumber = phoneNumber;
                dataBills.address = address;
                dataBills.total = totalPrice - 20000;
                console.log("Data bills: ", dataBills);
                let response1 = await orderService.addNewOrder(dataBills);
                if(response1 && response1.errCode === 0) {
                    alert('Th??m h??a ????n th??nh c??ng');
                        let dataDetailBillsArr = [];
                        let count = 0;
                        for(let i = 0; i < products.length; i++) {
                            let dataDetailBills = {};
                            dataDetailBills.id = id;
                            dataDetailBills.productName = products[i].product.title;
                            dataDetailBills.productColor = products[i].color;
                            dataDetailBills.productSize = products[i].size;
                            dataDetailBills.productPrice = products[i].product.price;
                            dataDetailBills.productQuantity = products[i].quantity;
                            dataDetailBills.productSlug = products[i].product.slug;
                            dataDetailBillsArr.push(dataDetailBills);
                            let response2 = await detailOrderService.addNewDetailOrder(dataDetailBills)
                            if(response2 && response2.errCode === 0) {
                                count++;
                            }
                        }
                        if(count === products.length) {
                            alert('Th??m chi ti???t h??a ????n th??nh c??ng');
                            let response = await orderService.sendOrderInfo(email, dataBills, dataDetailBillsArr);
                            if(response && response.errCode === 0) {
                                alert("G???i h??a ????n th??nh c??ng!")
                            }else {
                                alert("C?? l???i x???y ra")
                            }
                            onCloseModal();
                        }else {
                            alert('C?? l???i x???y ra');
                            onCloseModal();
                        }
                }
            }
        }
    }
    

    useEffect(async() => {
        let response = await provinceService.getAllProvince();
        let cityArr = response.data;
        setCities(cityArr);
        if(selectedCity !== '') {
            let cityChoose = cities.find((city, index) => city.name === selectedCity);
            if(cityChoose) {
                setDistricts(cityChoose.districts)
            }
        }
        if(selectedDistrict !== '') {
            let districtChoose = districts.find((district, index) => district.name === selectedDistrict)
            if(districtChoose) {
                setWards(districtChoose.wards)
            }
        }

        let response1 = await productService.getAllProduct();
        if(response1 && response1.errCode === 0) {
            let products = response1.data;
            for(let i = 0; i < products.length; i++) {
                products[i].colors = products[i].colors.split(', ');
                products[i].sizes = products[i].sizes.split(', ');
            }
            let productsDetail = productsMethod.getDetailProduct(products, cartItems)
            setProducts(productsDetail);
        }
        setTotalMoney(products.reduce((accumulator, item) => accumulator + (item.quantity * item.product.price), 0));
    }, [products], [discount]);

    return (
        <React.Fragment>
            <Header />
            <div className="delivery-info-container">
                <div className="delivery-info-container-left">
                    <div className="delivery-info-container-left-title">
                        <p className="delivery-info-container-left-title-content">Th??ng tin giao h??ng</p>
                    </div>
                    <div className="delivery-info-container-left-body">
                        <input type="text" className="delivery-info-container-left-body-input" placeholder="* H??? v?? t??n ?????m" onChange={(e) => setFirstName(e.target.value)}/>
                        <input type="text" className="delivery-info-container-left-body-input" placeholder="* T??n" onChange={(e) => setLastName(e.target.value)}/>
                        <input type="text" className="delivery-info-container-left-body-input" placeholder="* Email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="text" className="delivery-info-container-left-body-input" placeholder="* S??? ??i???n tho???i" onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <select id="province" className="delivery-info-container-left-body-select" onChange={(e) => setSelectedCity(e.target.value)}>
                            <option disable>* T???nh/ Th??nh ph???</option>
                            {cities && cities.length > 0 && cities.map((city, index) => (
                                <option key={index}>{city.name}</option>
                            ))}
                        </select>
                        <select id="province" className="delivery-info-container-left-body-select" onChange={(e) => setSelectedDistrict(e.target.value)}>
                            <option disable>* Qu???n/ Huy???n</option>
                            {districts && districts.length > 0 && districts.map((district, index) => (
                                <option key={index}>{district.name}</option>
                            ))}
                        </select>
                        <select id="province" className="delivery-info-container-left-body-select" onChange={(e) => setSelectedWard(e.target.value)}>
                            <option disable>* Ph?????ng/ X??</option>
                            {wards && wards.length > 0 && wards.map((ward, index) => (
                                <option key={index}>{ward.name}</option>
                            ))}
                        </select>
                        <input type="text" className="delivery-info-container-left-body-input" placeholder="* S??? nh?? t??n ???????ng" onChange={(e) => setRoadName(e.target.value)}/>
                        <p>(*) l?? tr?????ng kh??ng ???????c ????? tr???ng</p>
                    </div>
                </div>
                <div className="delivery-info-container-right">
                    <div className="delivery-info-container-right-products">
                        {products && products.length > 0 && products.map((item, index) => (
                            <CartItem item={item} key={index} isDelivery={true}/>
                        ))} 
                    </div>
                    <div className="delivery-info-container-right-checkout">
                        <div className="delivery-info-container-right-checkout-discount">
                            <input type="text" placeholder="M?? gi???m gi??..." className="delivery-info-container-right-checkout-discount-input" onChange={(e) => setVoucherCode(e.target.value)}/>
                            <button className="delivery-info-container-right-checkout-discount-button" onClick={handleDiscount}>??p d???ng</button>
                        </div>
                        <div className="delivery-info-container-right-checkout-info">
                            <div className="delivery-info-container-right-checkout-info-item bold">
                                <div className="delivery-info-container-right-checkout-info-item-title">T???ng:</div>
                                <div className="delivery-info-container-right-checkout-info-item-title">{formatNumber(totalMoney)} VN??</div>
                            </div>
                            <div className="delivery-info-container-right-checkout-info-item">
                                <div className="delivery-info-container-right-checkout-info-item-title">??u ????i:</div>
                                <div className="delivery-info-container-right-checkout-info-item-title">{discount ? discount : '0'}</div>
                            </div>
                            <div className="delivery-info-container-right-checkout-info-item">
                                <div className="delivery-info-container-right-checkout-info-item-title">Ph?? ship:</div>
                                <div className="delivery-info-container-right-checkout-info-item-title">{formatNumber(20000)} VN??</div>
                            </div>
                            <div className="delivery-info-container-right-checkout-info-item bold">
                                <div className="delivery-info-container-right-checkout-info-item-title">Th??nh ti???n:</div>
                                <div className="delivery-info-container-right-checkout-info-item-title">{totalPrice !== 0 ? formatNumber(totalPrice - 20000) : formatNumber(totalMoney - 20000)} VN??</div>
                            </div>
                            <button className="delivery-info-container-right-checkout-info-button" onClick={handleCheckout}>Ho??n t???t ????n h??ng</button>
                            <button className="delivery-info-container-right-checkout-info-button" onClick={handleOnClick}>Ti???p t???c mua h??ng</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
        
    )
}

export default DeliveryInfo