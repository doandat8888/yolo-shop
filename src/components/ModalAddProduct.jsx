import { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import CommonUtils from "../utils/CommonUtils";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import productService from "../services/productService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { getAllProduct } from "../redux/product/productItemSlice";
import { addNewProduct } from "../redux/product/productItemSlice";

const ModalAddProduct = (props) => {
    let {isActive} = props;
    let {oldData} = props;
    let {isResetData} = props;
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productSlug, setProductSlug] = useState('');
    const [productImg1, setProductImg1] = useState('');
    const [productImg1Url, setProductImg1Url] = useState('');
    const [productImg2, setProductImg2] = useState('');
    const [productImg2Url, setProductImg2Url] = useState('');
    const [productColors, setProductColors] = useState('');
    const [productSizes, setProductSizes] = useState('');
    const [categorySlug, setCategorySlug] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    let dispatch = useDispatch();
    //const [dataOld, setDataOld] = useState({});
    const mdParser = new MarkdownIt();

    const handleOnChangeImage = async(e, type) => {
        let files = e.target.files;
        let file = files[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log("base64: " + base64)
            let objectURL = URL.createObjectURL(file);
            if(type === 'IMG1') {
                setProductImg1(base64);
                setProductImg1Url(objectURL);
            }
            if(type === 'IMG2') {
                setProductImg2(base64);
                setProductImg2Url(objectURL);
            }
        }
    }

    const handleEditorChange = ({html, text}) => {
        setContentMarkdown(text);
        setContentHTML(html);
    }

    const resetData = () => {
        setProductName('')
        setProductPrice('');
        setProductSlug('');
        setProductImg1('');
        setProductImg2('');
        setProductImg1Url('');
        setProductImg2Url('');
        setProductColors('');
        setProductSizes('');
        setCategorySlug('');
        setContentHTML('');
        setContentMarkdown('');
        setProductQuantity('');
    }

    const onHideModal = () => {
        resetData();
        props.onCloseModal();
    }

    const handleProduct = async() => {
        let data = {};
        data.productName = productName;
        data.productPrice = productPrice;
        data.productSlug = productSlug;
        data.productImg1 = productImg1;
        data.productImg2 = productImg2;
        data.productColors = productColors;
        data.productSizes = productSizes;
        data.productCategorySlug = categorySlug;
        data.contentHTML = contentHTML;
        data.contentMarkdown = contentMarkdown;
        data.productQuantity = parseInt(productQuantity, 10);

        console.log("Data check: ", data);

        if(isResetData === true) {
            let response = await productService.addNewProduct(data);
            if(response && response.errCode === 0) {
                alert("Thêm sản phẩm thành công");
                props.onSuccess();
                onHideModal();
            }else if(response && response.errCode === 1) {
                alert("Vui lòng nhập đủ thông tin")
            }else if(response && response.errCode === 2) {
                alert("Sản phẩm đã tồn tại trong hệ thống. Vui lòng thử lại")
            }
        }else {
            console.log("Data to edit: ", data)
            let response = await productService.editProduct(data);
            if(response && response.errCode === 0) {
                alert("Cập nhật sản phẩm thành công");
                props.onSuccess();
                onHideModal();
            }else if(response && response.errCode === 1) {
                alert("Vui lòng nhập đủ thông tin")
            }
        }
        
    }

    useEffect(async() => {
        if(oldData && oldData.title) {
            setProductName(oldData.title);
            setProductPrice(oldData.price);
            setProductSlug(oldData.slug);
            setProductImg1Url(oldData.image01);
            setProductImg2Url(oldData.image02);
            setProductImg1('NO UPDATE');
            setProductImg2('NO UPDATE');
            setProductColors(oldData.colors);
            setProductSizes(oldData.sizes);
            setCategorySlug(oldData.categoryslug);
            setContentHTML(oldData.contenthtml);
            setContentMarkdown(oldData.contentmarkdown);
            setProductQuantity(oldData.quantity);
        }
        if(isResetData === true) {
            resetData();
        }
    }, [oldData], [isResetData]);

    return (
        <div className={`modal-add-product-container ${isActive !== '' ? isActive : ''}`}>
            <div className="modal-add-product-container-list">
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Tên sản phẩm</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nhập tên sản phẩm" onChange={(e) => setProductName(e.target.value)} value={productName}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Giá sản phẩm</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nhập giá sản phẩm" onChange={(e) => setProductPrice(e.target.value)} value={productPrice}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Slug</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nhập slug của sản phẩm" onChange={(e) => setProductSlug(e.target.value)} value={productSlug}/>
                </div>
                
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Kích thước</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nhập kích thước sản phẩm" onChange={(e) => setProductSizes(e.target.value)} value={productSizes}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Danh mục sản phẩm</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nhập danh mục sản phẩm" onChange={(e) => setCategorySlug(e.target.value)} value={categorySlug}/>
                    
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Màu sắc</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nhập màu sắc" onChange={(e) => setProductColors(e.target.value)} value={productColors}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Ảnh 1</p>
                    <input type="file" className="modal-add-product-container-item-input" onChange={(e) => handleOnChangeImage(e, "IMG1")} />
                    <label className="modal-add-product-container-item-label-upload" htmlFor="previewImg"></label>
                    <div 
                        className="modal-add-product-container-item-preview-image"
                        style={productImg1Url !== '' ? {backgroundImage: `url(${productImg1Url})`} : {} }
                    >
                    </div>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Ảnh 2</p>
                    <input type="file" className="modal-add-product-container-item-input" onChange={(e) => handleOnChangeImage(e, "IMG2")} />
                    <label className="modal-add-product-container-item-label-upload" htmlFor="previewImg"></label>
                    <div 
                        className="modal-add-product-container-item-preview-image"
                        style={productImg2Url !== '' ? {backgroundImage: `url(${productImg2Url})`} : {} }
                    >
                    </div>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Số lượng</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nhập số lượng" onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity}/>
                </div>
            </div>
            <MdEditor style={{ height: '500px', textAlign: 'left'}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={contentMarkdown}/>
            <div className="modal-add-product-container-button">
                <button className="modal-add-product-container-button-confirm" onClick={handleProduct}>{isResetData === true ? 'Thêm' : 'Cập nhật'}</button>
                <button className="modal-add-product-container-button-cancel" onClick={onHideModal}>Hủy bỏ</button>
            </div>
            
        </div>
    )
}

export default ModalAddProduct