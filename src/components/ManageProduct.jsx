import { useEffect, useState } from "react";
import formatNumber from "../utils/formatNumber";
import ModalAddProduct from "./ModalAddProduct";
import { useSelector } from "react-redux";
import colors from "../assets/data/product-color";
import sizes from "../assets/data/product-size";
import productService from "../services/productService";
import { useDispatch } from "react-redux";
import {getAllProduct} from '../redux/product/productItemSlice';


const ManageProduct = (props) => {
    const [isActive, setIsActive] = useState('');
    const [oldData, setOldData] = useState({});
    const [isResetData, setIsResetData] = useState(false);
    let [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();

    const closeModal = () => {
        setOldData({});
        setIsActive('');
    }

    const openModal = (data, type) => {
        setIsActive('active');
        setOldData(data);
        if(type === 'ADD') {
            setIsResetData(true);
        }else if(type === 'EDIT') {
            setIsResetData(false);
        }
    }

    const onDeleteProduct = async(data) => {
        let response = await productService.deleteProduct(data.slug);
        if(response && response.errCode === 0) {
            alert("Xóa sản phẩm thành công");
            onSuccess();
        }
    }

    const onSuccess = async() => {
        let response = await productService.getAllProduct();
        if(response && response.errCode === 0) {
            setProducts(response.data);
        }
    }

    const getItem = (type, item) => {
        let result = {}
        if(type === "COLOR") {
            result = colors.find((color, index) => color.color === item);
        }
        if(type === "SIZE") {
            result = sizes.find((size, index) => size.size === item);
        }
        return result;
    }

    const getString = (type, arrOrigin) => {
        let result = '';
        if(type === "COLOR") {
            for(let i = 0; i < arrOrigin.length; i++) {
                let colorItem = getItem(type, arrOrigin[i]);
                if(colorItem) {
                    if(i === 0) {
                        result += colorItem.display;
                    }else {
                        result += ', ';
                        result += colorItem.display;
                    }
                }
            }
        }
        if(type === "SIZE") {
            for(let i = 0; i < arrOrigin.length; i++) {
                let sizeItem = getItem(type, arrOrigin[i]);
                if(sizeItem) {
                    if(i === 0) {
                        result += sizeItem.display;
                    }else {
                        result += ', ';
                        result += sizeItem.display;
                    }
                }
            }
        }
        
        return result;
    }

    const onSearch = (e) => {
        setKeyword(e.target.value);
    }

    useEffect(async() => {
        let response = await productService.getAllProduct();
        if(response && response.errCode === 0) {
            let productArr = response.data;
            setProducts(productArr);
        }
        setOldData(oldData);
        setKeyword(keyword);
    }, [oldData], [products], [keyword]);

    if(keyword) {
        products = products.filter((product) => product.title.includes(keyword));
    }

    return (
        <div className="manage-product-container">
            <div className="manage-product-container-title">
                <p className="manage-product-container-title-content">Quản lí sản phẩm</p>
            </div>
            <div className="manage-product-container-body">
                <div className="manage-product-container-body-top">
                    <div className="manage-product-container-body-top-left">
                        <i className='bx bx-search manage-product-container-body-top-left-icon'></i>
                        <input type="text" className="manage-product-container-body-top-left-input-search" placeholder="Tìm thông tin sản phẩm theo tên..." onChange={(e) => onSearch(e)}/>
                    </div>
                    <div className="manage-product-container-body-top-right">
                        <button className="manage-product-container-body-top-right-button" onClick={() => openModal({}, "ADD")}>
                            <i className="bx bx-plus"></i>
                            <p className="manage-product-container-body-top-right-button-content">Thêm</p>
                        </button>
                    </div>
                </div>
                <ModalAddProduct isActive={isActive} onCloseModal={closeModal} oldData={oldData} isResetData={isResetData} onSuccess={onSuccess}/>
                <div className='products-table mt-4 mx-1'>
                    <table id="products">
                        <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Màu sắc</th>
                            <th>Kích cỡ</th>
                            <th>Số lượng</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                        {products && products.length > 0 && products.map((product, index) => {
                            let colorArr = product.colors.split(', ');
                            let sizeArr = product.sizes.split(', ');
                            let colorStr = getString("COLOR", colorArr);
                            let sizeStr = getString("SIZE", sizeArr)
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.title}</td>
                                    <td>{formatNumber(product.price)}</td>
                                    <td>{colorStr}</td>
                                    <td>{sizeStr}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <img src={product.image01} className="product-img"/>
                                        <img src={product.image02} className="product-img"/>
                                    </td>
                                    <td className="products-table-action">
                                        <button className="products-table-btn-edit" onClick={() => openModal(product, "EDIT")}>
                                            <i className='bx bx-pencil products-table-btn-edit-icon'></i>
                                            <p className="products-table-btn-edit-content">Sửa</p>
                                        </button>
                                        <button className="products-table-btn-cancel" onClick={() => onDeleteProduct(product)}>
                                            <i className='bx bx-trash products-table-btn-del-icon'></i>
                                            <p className="products-table-btn-cancel-content">Xóa</p>
                                        </button>
                                    </td>
                                </tr>
                            )
                            
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageProduct;