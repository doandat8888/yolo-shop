import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import logo from '../assets/images/Logo-2.png';
import sliderData from '../assets/data/slider.js';
import { useHistory } from 'react-router-dom';
import 'boxicons';

const categorys = [
    {
        display: 'Trang chủ',
        path: '/'
    },
    {
        display: 'Sản phẩm',
        path: '/catalog'
    },
    // {
    //     display: 'Phụ kiện',
    //     path: '/event'
    // },
    // {
    //     display: 'Liên hệ',
    //     path: '/contact'
    // }
]

const Header = () => {
    let path = useLocation().pathname;
    let indexActive = categorys.findIndex((category) => category.path === path);
    let history = useHistory();
    const[active, setActive] = useState(false);
    const gotoCart = () => {
        history.push('/cart');
    }

    const gotoHome = () => {
        history.push('/');
    }
    const onToggleHeader = () => {
        setActive(!active);
    }
    const gotoLoginPage = () => {
        history.push('/admin');
    }

    return (
        <div className="header-container">
            <i className = "bx bx-menu-alt-left header-container-show-header" onClick={onToggleHeader}></i>
            <div className={`header-container-header-mobile ${active === true ? 'active' : ''}`}>
                <i className="bx bx-left-arrow-alt header-container-header-mobile-hide-header" onClick={onToggleHeader}></i>
                <ul className="header-container-left-list">
                    {categorys.map((category, index) => {
                        return (
                            <li className="header-container-left-item" key={index} onClick={onToggleHeader}>
                                <Link to={category.path} className={`header-container-left-item-link ${indexActive === index ? 'active' : ''}`}>{category.display}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="header-container-left">
                <ul className="header-container-left-list">
                    {categorys.map((category, index) => {
                        return (
                            <li className="header-container-left-item" key={index}>
                                <Link to={category.path} className={`header-container-left-item-link ${indexActive === index ? 'active' : ''}`}>{category.display}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="header-container-middle">
                <img className="header-container-middle-img" src={logo} onClick={gotoHome}/>
            </div>
            <div className="header-container-right">
                <div className="header-container-right-list">
                    <div className="header-container-right-item">
                        <i className = "bx bx-search header-container-right-item-icon"></i>
                    </div>
                    <div className="header-container-right-item">
                        <i className='bx bx-shopping-bag header-container-right-item-icon' onClick={gotoCart}></i>
                    </div>
                    <div className="header-container-right-item">
                        <i className='bx bx-user header-container-right-item-icon' onClick={gotoLoginPage}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;