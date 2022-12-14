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
                alert("Th??m s???n ph???m th??nh c??ng");
                props.onSuccess();
                onHideModal();
            }else if(response && response.errCode === 1) {
                alert("Vui l??ng nh???p ????? th??ng tin")
            }else if(response && response.errCode === 2) {
                alert("S???n ph???m ???? t???n t???i trong h??? th???ng. Vui l??ng th??? l???i")
            }
        }else {
            console.log("Data to edit: ", data)
            let response = await productService.editProduct(data);
            if(response && response.errCode === 0) {
                alert("C???p nh???t s???n ph???m th??nh c??ng");
                props.onSuccess();
                onHideModal();
            }else if(response && response.errCode === 1) {
                alert("Vui l??ng nh???p ????? th??ng tin")
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
                    <p className="modal-add-product-container-item-title">T??n s???n ph???m</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nh???p t??n s???n ph???m" onChange={(e) => setProductName(e.target.value)} value={productName}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Gi?? s???n ph???m</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nh???p gi?? s???n ph???m" onChange={(e) => setProductPrice(e.target.value)} value={productPrice}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Slug</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nh???p slug c???a s???n ph???m" onChange={(e) => setProductSlug(e.target.value)} value={productSlug}/>
                </div>
                
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">K??ch th?????c</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nh???p k??ch th?????c s???n ph???m" onChange={(e) => setProductSizes(e.target.value)} value={productSizes}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">Danh m???c s???n ph???m</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nh???p danh m???c s???n ph???m" onChange={(e) => setCategorySlug(e.target.value)} value={categorySlug}/>
                    
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">M??u s???c</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nh???p m??u s???c" onChange={(e) => setProductColors(e.target.value)} value={productColors}/>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">???nh 1</p>
                    <input type="file" className="modal-add-product-container-item-input" onChange={(e) => handleOnChangeImage(e, "IMG1")} />
                    <label className="modal-add-product-container-item-label-upload" htmlFor="previewImg"></label>
                    <div 
                        className="modal-add-product-container-item-preview-image"
                        style={productImg1Url !== '' ? {backgroundImage: `url(${productImg1Url})`} : {} }
                    >
                    </div>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">???nh 2</p>
                    <input type="file" className="modal-add-product-container-item-input" onChange={(e) => handleOnChangeImage(e, "IMG2")} />
                    <label className="modal-add-product-container-item-label-upload" htmlFor="previewImg"></label>
                    <div 
                        className="modal-add-product-container-item-preview-image"
                        style={productImg2Url !== '' ? {backgroundImage: `url(${productImg2Url})`} : {} }
                    >
                    </div>
                </div>
                <div className="modal-add-product-container-item">
                    <p className="modal-add-product-container-item-title">S??? l?????ng</p>
                    <input type="text" className="modal-add-product-container-item-input" placeholder="Nh???p s??? l?????ng" onChange={(e) => setProductQuantity(e.target.value)} value={productQuantity}/>
                </div>
            </div>
            <MdEditor style={{ height: '500px', textAlign: 'left'}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} value={contentMarkdown}/>
            <div className="modal-add-product-container-button">
                <button className="modal-add-product-container-button-confirm" onClick={handleProduct}>{isResetData === true ? 'Th??m' : 'C???p nh???t'}</button>
                <button className="modal-add-product-container-button-cancel" onClick={onHideModal}>H???y b???</button>
            </div>
            
        </div>
    )
}

export default ModalAddProduct