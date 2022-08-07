import categories from "../assets/data/product-category";
import colors from "../assets/data/product-color";
import sizes from "../assets/data/product-size";
import TopProducts from "../components/TopProducts";
import productsMethod from "../assets/data/products";
import React, {useState, useEffect, useRef, useCallback} from 'react';
import Footer from '../components/Footer';
import Header from "../components/Header";
import productService from "../services/productService";

const Catalog = () => {

    //let datas = productsMethod.getAllProduct();

    const initialFilters = {
        categories: [],
        colors: [],
        sizes: [],
    }
    //const initialProducts = productsMethod.getAllProduct();
    let [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(initialFilters);
    const [active, setActive] = useState(false);
    const [translate, setTranslate] = useState(false);


    // useEffect(async() => {
        
    // }, [])

    
    
    const filterMethod = (type, checked, slug) => {    
        // console.log(checked);
        // console.log(type);
        // console.log(slug);
        if(checked ===  true) {
            switch (type) {
                case 'CATEGORY':
                    const newCategories = [...filter.categories, slug] 
                    //giữ nguyên object cũ nhưng set lại mảng categories thêm giá trị slug vào
                    //sở dĩ phải set giá trị ban đầu của categories, colors và sizes là mảng vì có thể thêm nhiều giá trị checkbox 1 lần => thêm nhiều slug
                    setFilter({...filter, categories: newCategories})
                    break;
                case 'COLOR':
                    const newColors = [...filter.colors, slug]
                    setFilter({...filter, colors: newColors})
                    break;
                case 'SIZE':
                    const newSizes = [...filter.sizes, slug]
                    setFilter({...filter, sizes: newSizes})
                    break;
                default:
                    break;
            }
        }else if(checked === false){
            switch(type) {
                case 'CATEGORY':
                    const newCategorys = filter.categories.filter((category) => category !== slug)
                    setFilter({...filter, categories: newCategorys})
                    break;
                case 'COLOR':
                    const newColors = filter.colors.filter((color) => color !== slug)
                    setFilter({...filter, colors: newColors})
                    break;
                case 'SIZE':
                    const newSizes = filter.sizes.filter((size) => size !== slug)
                    setFilter({...filter, sizes: newSizes})
                    break;
                default:
                    break;
            }
        }
    }

    const updateProduct = useCallback(() => {
        
        //setProducts(newProducts);
    }, [filter], [products]);

    const removeFilter = () => setFilter(initialFilters);

    const toggleFilter = async(type) => {
        if(type === 'SHOW') {
            await setTranslate(true);
            setActive(true);
        }
        if(type === 'HIDE') {
            await setTranslate(false);
            setActive(false);
        }
    }

    useEffect(async() => {
        let response = await productService.getAllProduct();
        if(response && response.errCode === 0) {
            let products = response.data;
            //console.log("All product catalog check: ", products);
            for(let i = 0; i < products.length; i++) {
                products[i].colors = products[i].colors.split(', ');
                products[i].sizes = products[i].sizes.split(', ');
            }
            setProducts(products);
        }
    },[products])

    if(filter.categories.length > 0) {
        products = products.filter((product) => filter.categories.includes(product.categoryslug))
    }
    if(filter.colors.length > 0) {
        products = products.filter((product) => {
            const check = product.colors.find((color) => filter.colors.includes(color))
            return check !== undefined
        })
    }
    if(filter.sizes.length > 0) {
        products = products.filter((product) => {
            const check = product.sizes.find((size) => filter.sizes.includes(size))
            return check !== undefined
        })
    }


    return (
        <React.Fragment>
            <Header />
            <div className="catalog-container">
                <button className="catalog-container-left-show-hide-filter" onClick={() => toggleFilter("SHOW")}>Bộ lọc</button>
                <div className={`catalog-container-filter ${active === true ? 'active' : ''} ${translate === true ? 'translate' : ''}`}>
                    <i className="bx bx-left-arrow-alt catalog-container-filter-icon-hide-filter" onClick={() => toggleFilter("HIDE")}></i>
                    <div className="catalog-container-left-first">
                        <div className="catalog-container-left-first-title">
                            <p>Danh Mục Sản Phẩm</p>
                        </div>
                        {categories.map((category, index) => (
                            <div className="catalog-container-left-first-select" key={index}>
                                <input 
                                    id = {category.display} 
                                    type="checkbox" 
                                    className="catalog-container-left-first-select-checkbox" 
                                    //onClick={(input) => filterMethod('CATEGORY', input.checked, category.categorySlug)}
                                    checked = {filter.categories.includes(category.categorySlug)} 
                                    onChange={(e) => filterMethod('CATEGORY', e.target.checked, category.categorySlug)}
                                />
                                <p className="catalog-container-left-first-select-content">{category.display}</p>
                            </div>
                        ))}
                    </div>
                    <div className="catalog-container-left-first">
                        <div className="catalog-container-left-first-title">
                            <p>Màu Sắc</p>
                        </div>
                        {colors.map((color, index) => (
                            <div className="catalog-container-left-first-select" key={index}>
                                <input 
                                    id={color.display}
                                    type="checkbox" 
                                    className="catalog-container-left-first-select-checkbox" 
                                    //onClick={(input) => filterMethod('COLOR', input.checked, color.color)}
                                    checked = {filter.colors.includes(color.color)}
                                    onChange={(e) => filterMethod('COLOR', e.target.checked, color.color)}
                                />
                                <p className="catalog-container-left-first-select-content">{color.display}</p>
                            </div>
                        ))}
                    </div>
                    <div className="catalog-container-left-first">
                        <div className="catalog-container-left-first-title">
                            <p>Kích cỡ</p>
                        </div>
                        {sizes.map((size, index) => (
                            <div className="catalog-container-left-first-select" key={index}>
                                <input 
                                    id={size.display}
                                    type="checkbox" 
                                    className="catalog-container-left-first-select-checkbox" 
                                    //onClick={(input) => filterMethod('SIZE', input.checked, size.size)}
                                    checked = {filter.sizes.includes(size.size)}
                                    onChange={(e) => filterMethod('SIZE', e.target.checked, size.size)}
                                />
                                <p className="catalog-container-left-first-select-content">{size.display}</p>
                            </div>
                        ))}
                    </div>
                    <button className="catalog-container-left-button" onClick={removeFilter}>Xóa bộ lọc</button>
                </div>
                <div className="catalog-container-body">
                    <div className="catalog-container-left">
                        
                        <div className="catalog-container-left-first">
                            <div className="catalog-container-left-first-title">
                                <p>Danh Mục Sản Phẩm</p>
                            </div>
                            {categories.map((category, index) => (
                                <div className="catalog-container-left-first-select" key={index}>
                                    <input 
                                        id = {category.display} 
                                        type="checkbox" 
                                        className="catalog-container-left-first-select-checkbox" 
                                        //onClick={(input) => filterMethod('CATEGORY', input.checked, category.categorySlug)}
                                        checked = {filter.categories.includes(category.categorySlug)} 
                                        onChange={(e) => filterMethod('CATEGORY', e.target.checked, category.categorySlug)}
                                    />
                                    <p className="catalog-container-left-first-select-content">{category.display}</p>
                                </div>
                            ))}
                        </div>
                        <div className="catalog-container-left-first">
                            <div className="catalog-container-left-first-title">
                                <p>Màu Sắc</p>
                            </div>
                            {colors.map((color, index) => (
                                <div className="catalog-container-left-first-select" key={index}>
                                    <input 
                                        id={color.display}
                                        type="checkbox" 
                                        className="catalog-container-left-first-select-checkbox" 
                                        //onClick={(input) => filterMethod('COLOR', input.checked, color.color)}
                                        checked = {filter.colors.includes(color.color)}
                                        onChange={(e) => filterMethod('COLOR', e.target.checked, color.color)}
                                    />
                                    <p className="catalog-container-left-first-select-content">{color.display}</p>
                                </div>
                            ))}
                        </div>
                        <div className="catalog-container-left-first">
                            <div className="catalog-container-left-first-title">
                                <p>Kích cỡ</p>
                            </div>
                            {sizes.map((size, index) => (
                                <div className="catalog-container-left-first-select" key={index}>
                                    <input 
                                        id={size.display}
                                        type="checkbox" 
                                        className="catalog-container-left-first-select-checkbox" 
                                        //onClick={(input) => filterMethod('SIZE', input.checked, size.size)}
                                        checked = {filter.sizes.includes(size.size)}
                                        onChange={(e) => filterMethod('SIZE', e.target.checked, size.size)}
                                    />
                                    <p className="catalog-container-left-first-select-content">{size.display}</p>
                                </div>
                            ))}
                        </div>
                        <button className="catalog-container-left-button" onClick={removeFilter}>Xóa bộ lọc</button>
                    </div>
                    <div className="catalog-container-right">
                        <TopProducts datas={products} col={'one-third'}/>
                    </div>
                </div>
                <Footer />
            </div>
        </React.Fragment>
        
    )
}

export default Catalog;