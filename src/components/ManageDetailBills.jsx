import { useEffect, useState } from "react";
import detailOrderService from "../services/detailOrderService";
import formatNumber from "../utils/formatNumber";
import colors from "../assets/data/product-color";
import sizes from "../assets/data/product-size";

const ManageDetailBills = () => {
    let [detailBills, setDetailBilss] = useState([]);

    useEffect(async() => {
        let response = await detailOrderService.getAllDetailOrder();
        if(response && response.errCode === 0) {
            setDetailBilss(response.data);
        }
    }, [detailBills])

    const hanldeConfirm = () => {
        alert('Xác nhận đơn hàng thành công')
    }

    let getInfo = (type, value) => {
        let result = {};
        if(type === 'COLOR') {
            result = colors.find(color => color.color === value);
        }
        if(type === 'SIZE') {
            result = sizes.find(size => size.size === value);
        }
        return result;
    }

    return (
        <div className="manage-product-container">
            <div className="manage-product-container-title">
                <p className="manage-product-container-title-content">Quản lí hóa đơn</p>
            </div>
            <div className="manage-product-container-body">
                {/* <div className="manage-product-container-body-top">
                    <div className="manage-product-container-body-top-left">
                        <i className='bx bx-search manage-product-container-body-top-left-icon'></i>
                        <input type="text" className="manage-product-container-body-top-left-input-search" placeholder="Tìm thông tin sản phẩm theo tên..." on/>
                    </div>
                </div> */}
                <div className='products-table mt-4 mx-1'>
                    <table id="products">
                        <tr>
                            <th>STT</th>
                            <th>Mã hóa đơn</th>
                            <th>Tên sản phẩm</th>
                            <th>Màu sắc</th>
                            <th>Kích cỡ</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Hành động</th>
                        </tr>
                        {detailBills && detailBills.length > 0 && detailBills.map((detailBill, index) => {
                            let color = getInfo('COLOR', detailBill.productcolor);
                            //console.log(color);
                            let size = getInfo('SIZE', detailBill.productsize)
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{detailBill.billid}</td>
                                    <td>{formatNumber(detailBill.productname)}</td>
                                    <td>{color.display}</td>
                                    <td>{size.display}</td>
                                    <td>{detailBill.price}</td>
                                    <td>{detailBill.quantity}</td>
                                    <td className="products-table-action">
                                        <button className="products-table-btn-edit">
                                            <i className='bx bx-pencil products-table-btn-edit-icon'></i>
                                            <p className="products-table-btn-edit-content" onClick={hanldeConfirm}>Xác nhận</p>
                                        </button>
                                        {/* <button className="products-table-btn-cancel" onClick={() => onDeleteProduct(product)}>
                                            <i className='bx bx-trash products-table-btn-del-icon'></i>
                                            <p className="products-table-btn-cancel-content">Xóa</p>
                                        </button> */}
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

export default ManageDetailBills;