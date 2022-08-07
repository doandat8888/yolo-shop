import React from "react";
import logo from '../assets/images/Logo-2.png';
const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-container-list">
                <div className="footer-container-item">
                    <div className="footer-container-title">
                        <p className="footer-container-title-content">Tổng đài hỗ trợ</p>
                    </div>
                    <div className="footer-container-body">
                        <p className="footer-container-body-content">Liên hệ đặt hàng: <b>0935112869</b></p>
                        <p className="footer-container-body-content">Thắc mắc đơn hàng: <b>0935112869</b></p>
                        <p className="footer-container-body-content">Gợi ý khiếu nại: <b>0935112869</b></p>
                    </div>
                </div>
                <div className="footer-container-item">
                    <div className="footer-container-title">
                        <p className="footer-container-title-content">Về Yolo</p>
                    </div>
                    <div className="footer-container-body">
                        <p className="footer-container-body-content active">Giới thiệu</p>
                        <p className="footer-container-body-content active">Liên hệ</p>
                        <p className="footer-container-body-content active">Tuyển dụng</p>
                        <p className="footer-container-body-content active">Tin tức</p>
                        <p className="footer-container-body-content active">Hệ thống cửa hàng</p>
                    </div>
                </div>
                <div className="footer-container-item">
                    <div className="footer-container-title">
                        <p className="footer-container-title-content">Chăm sóc khách hàng</p>
                    </div>
                    <div className="footer-container-body">
                        <p className="footer-container-body-content active">Chính sách đổi trả</p>
                        <p className="footer-container-body-content active">Chính sách bảo hành</p>
                        <p className="footer-container-body-content active">Chính sách hoàn tiền</p>
                    </div>
                </div>
                <div className="footer-container-item">
                    <div className="footer-container-title">
                        <img src={logo} className="footer-container-title-img" />
                    </div>
                    <div className="footer-container-body">
                        <p className="footer-container-body-content">
                            Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi 
                            ngày cho hàng triệu người tiêu dùng Việt.  
                            Hãy cùng Yolo hướng đến một cuộc sống năng  
                            động, tích cực hơn.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;