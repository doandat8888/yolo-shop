import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ManageProduct from "../components/ManageProduct";
import ManageEmployee from "../components/ManageEmployee";
import ManageDetailBills from "../components/ManageDetailBills";
import ManageCustomer from "../components/ManageCustomer";
import Statistic from "../components/Statistic";
import { Switch, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import productService from "../services/productService";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../redux/product/productItemSlice";
import { useHistory } from "react-router-dom";

const favicon = require('../assets/images/favicon.png').default;

const AdminPage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [link, setLink] = useState('');
    let history = useHistory();
    
    let user = useSelector((item) => item.user.userInfo);
    useEffect(async() => {
        setUserInfo(user);
        setLink(link);
    }, [userInfo], [link]);


    const categories = [
        {
            title: 'Sản phẩm',
            icon: 'bx bxs-t-shirt',
            path: '/manage-product'
        },
        // {
        //     title: 'Nhân viên',
        //     icon: 'bx bx-user',
        //     path: '/manage-employee'
        // },
        {
            title: 'Khách hàng',
            icon: 'bx bx-male',
            path: '/manage-customer'
        },
        {
            title: 'Đơn hàng',
            icon: 'bx bx-package',
            path: '/manage-bills'
        },
        {
            title: 'Thống kê',
            icon: 'bx bx-line-chart',
            path: '/statistic'
        },
        {
            title: 'Đăng xuất',
            icon: 'bx bx-log-out',
            path: '/logout'
        }
        
    ]

    if(link === '/logout') {
        history.push('/admin');
    }

    
    
    return (
        
        <div className="admin-page-container">
            <div className="admin-page-container-left">
                <div className="admin-page-container-left-title">
                    <img src={favicon} className="admin-page-container-left-title-img"/>
                </div>
                <div className="admin-page-container-left-list">
                    {categories.map((category, index) => (
                        <div className="admin-page-container-left-item" key={index} onClick={() => setLink(category.path)}>
                            <div className="admin-page-container-left-item-left">
                                <i className={`${category.icon} admin-page-container-left-item-left-icon`}></i>
                            </div>
                            <div className="admin-page-container-left-item-right">{category.title}</div>
                        </div>
                    ))}
                   
                </div>
                
            </div>
            <div className="admin-page-container-right">
                <div className="admin-page-container-right-header">
                    <div className="admin-page-container-right-header-left">
                        <i className='bx bx-menu admin-page-container-right-header-left-icon'></i>
                        <p className="admin-page-container-right-header-left-content">Tổng quan</p>
                    </div>
                    <div className="admin-page-container-right-header-middle">
                        <i className='bx bx-search admin-page-container-right-header-middle-icon'></i>
                        <input type="text" className="admin-page-container-right-header-middle-input-search" placeholder="Bạn tìm gì..."/>
                    </div>
                    <div className="admin-page-container-right-header-right">
                        <div className="admin-page-container-right-header-right-left">
                            <img src={userInfo.image} className="admin-page-container-right-header-right-left-img"/>
                        </div>
                        <div className="admin-page-container-right-header-right-right">
                            <div className="admin-page-container-right-header-right-right-top">{userInfo.firstName} {userInfo.lastName}</div>
                            <div className="admin-page-container-right-header-right-right-bottom">{userInfo.roleId === 'R1' ? 'Quản trị viên' : 'Nhân viên'}</div>
                        </div>
                    </div>
                </div>
                <div className="admin-page-container-right-body">
                    {link === '/manage-product' || link === '' ? <ManageProduct /> : link === '/manage-employee' ? <ManageEmployee /> : link === '/manage-bills' ? <ManageDetailBills /> : link === '/manage-customer' ? <ManageCustomer /> : <Statistic />}
                </div>
            </div>
        </div>
    )
}

export default AdminPage;