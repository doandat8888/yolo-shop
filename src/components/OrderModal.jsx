import { useEffect, useState } from 'react';
import logo from '../assets/images/favicon.png';
import CartItem from './CartItem';
import formatNumber from '../utils/formatNumber';
import orderService from '../services/orderService';
import detailOrderService from '../services/detailOrderService';
import productService from '../services/productService';

const OrderModal = (props) => {
    let {isOpenModal, products, totalMoney} = props;
    const [isOrdering, setIsOrdering] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [total, setTotal] = useState(totalMoney); 
    const [productsArr, setProductsArr] = useState(products);
    const [email, setEmail] = useState('');

    const onCloseModal = () => {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setAddress('');
        setTotal('');
        setProductsArr([]);
        setEmail('');
        props.onCloseModal();
    }

    const onHandleOrder = async() => {
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
            dataBills.total = total;
            console.log("Data bills: ", dataBills);
            let response1 = await orderService.addNewOrder(dataBills);
            if(response1 && response1.errCode === 0) {
                alert('Thêm hóa đơn thành công');
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
                        alert('Thêm chi tiết hóa đơn thành công');
                        let response = await orderService.sendOrderInfo(email, dataBills, dataDetailBillsArr);
                        if(response && response.errCode === 0) {
                            alert("Gửi hóa đơn thành công!")
                        }else {
                            alert("Có lỗi xảy ra")
                        }
                        onCloseModal();
                    }else {
                        alert('Có lỗi xảy ra');
                        onCloseModal();
                    }
            }
        }
        
            // let response = await orderService.getOrderByPhoneNumber(dataBills.phoneNumber)
            // if(response && response.errCode === 0) {
            
            //     console.log("Data detail bills arr: ", dataDetailBillsArr);
                
            // }
            
        // }else if(response && response.errCode === 1) {
        //     alert('Vui lòng nhập đủ thông tin')
        // }
        
    }

    useEffect(() => {
        setProductsArr(products);
        setTotal(totalMoney);
    }, [totalMoney])
    return (
        <div className={`order-modal-container ${isOpenModal === true ? 'active' : ''}`}>
            <div className="order-modal-container-content">
                <div className="order-modal-container-content-header">
                    <img src={logo} className="order-modal-container-content-header-img"/>
                    {/* <i className='bx bxs-x-circle order-modal-container-content-header-icon' onClick={onCloseModal}></i> */}
                </div>
                <div className="order-modal-container-content-body">
                    <div className="order-modal-container-content-body-list">
                        <div className="order-modal-container-content-body-item">
                            <div className="order-modal-container-content-body-item-title">Họ tên đệm</div>
                            <input className="order-modal-container-content-body-item-input" placeholder="Nhập họ tên đệm..." onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="order-modal-container-content-body-item">
                            <div className="order-modal-container-content-body-item-title">Tên</div>
                            <input className="order-modal-container-content-body-item-input" placeholder="Nhập tên.." onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div className="order-modal-container-content-body-item">
                            <div className="order-modal-container-content-body-item-title">Số điện thoại</div>
                            <input className="order-modal-container-content-body-item-input" placeholder="Nhập SĐT..." onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </div>
                        <div className="order-modal-container-content-body-item">
                            <div className="order-modal-container-content-body-item-title">Email</div>
                            <input className="order-modal-container-content-body-item-input" placeholder="Nhập email..." onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="order-modal-container-content-body-item">
                            <div className="order-modal-container-content-body-item-title">Địa chỉ</div>
                            <input className="order-modal-container-content-body-item-input" placeholder="Nhập địa chỉ..." onChange={(e) => setAddress(e.target.value)}/>
                        </div>

                    </div>
                    <div className="order-modal-container-content-body-cart">
                        <div className="order-modal-container-content-body-cart-title">Thông tin giỏ hàng</div>
                        <div className="order-modal-container-content-body-cart-list">
                            {products && products.length > 0 && products.map((item, index) => (
                                <CartItem item={item} key={index} isOrdering={isOrdering}/>
                            ))}
                        </div>
                        <div className="order-modal-container-content-body-cart-total">
                            Tổng: {formatNumber(totalMoney)}
                        </div>
                    </div>
                    <div className="order-modal-container-content-body-btn">
                        <button className="order-modal-container-content-body-btn-content confirm" onClick={onHandleOrder}>Xác nhận</button>
                        <button className="order-modal-container-content-body-btn-content cancel" onClick={onCloseModal}>Hủy bỏ</button>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default OrderModal;