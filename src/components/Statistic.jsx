import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import productService from '../services/productService';
import detailOrderService from '../services/detailOrderService';
import orderService from '../services/orderService';

const Statistic = () => {

    const [nameArr, setNameArr] = useState([]);
    const [customerNameArr, setCustomerNameArr] = useState([]);

    const [colorArr, setColorArr] = useState([]);
    let [saleArr, setSaleArr] = useState([]);
    let [numberOfPurchasesArr, setNumberOfPurchasesArr] = useState([]);

    useEffect(async() => {
        let response = await productService.getAllProduct();
        // if(response && response.errCode === 0) {
        //     let nameArr = [];
        //     let colorArr = [];
        //     let products = response.data;
        //     for(let i = 0; i < products.length; i++) {
        //         nameArr.push(products[i].title);
        //         colorArr.push('#4267b2');
        //     }
        //     setNameArr(nameArr);
        //     setColorArr(colorArr);
            let response2 = await detailOrderService.getAllDetailOrder();
            if(response2 && response2.errCode === 0) {
                let detailOrders = response2.data;
                console.log(detailOrders);
                let saleArr = [];
                let nameArr = [];
                let colorArr = []; 
                for(let i = 0; i < detailOrders.length; i++) {
                    if(detailOrders[i].quantity !== -1) {
                        nameArr.push(detailOrders[i].productname);
                        colorArr.push('#4267b2')
                        let sumQuantity = detailOrders[i].quantity;
                        for(let j = i + 1; j < detailOrders.length; j++) {
                            if(detailOrders[i].productname === detailOrders[j].productname) {
                                sumQuantity += detailOrders[j].quantity;
                                detailOrders[j].quantity = -1;
                            }
                        }
                        saleArr.push(sumQuantity);
                    }
                    
                }
                setNameArr(nameArr);
                setSaleArr(saleArr);
                setColorArr(colorArr);
            }
        //}
        let response3 = await orderService.getAllOrder();
        if(response3 && response3.errCode === 0) {
            let bills = response3.data;
            let nameArr = [];
            let numberOfPurchasesArr = [];
            for(let i = 0; i < bills.length; i++) {
                if(bills[i].phonenumber !== '') {
                    let firstName = bills[i].firstname;
                    let lastName = bills[i].lastname;
                    let fullName = firstName + ' ' + lastName;
                    nameArr.push(fullName);
                    let numberOfPurchases = 1;
                    for(let j = i + 1; j < bills.length; j++) {
                        if(bills[i].phonenumber === bills[j].phonenumber) {
                            numberOfPurchases++;
                            bills[j].phonenumber = '';
                        }
                    }
                    numberOfPurchasesArr.push(numberOfPurchases);
                }
                
            }
            setCustomerNameArr(nameArr);
            setNumberOfPurchasesArr(numberOfPurchasesArr);
        }
    }, []);


    return (
        <div className="statistic-container">
            <div className="statistic-container-product">
                <div className="statistic-container-product-title">
                    <p className="statistic-container-product-title-content">Sản phẩm bán chạy</p>
                </div>
                <Bar
                    data={{
                        labels: nameArr,
                        datasets: [{
                            label: 'Số lượng bán ra',
                            data: saleArr,
                            backgroundColor: colorArr,
                            
                        }]
                    }}
                    height={120}
                    weight={900}
                />
                <div className="statistic-container-product-title">
                    <p className="statistic-container-product-title-content">Khách hàng nổi bật</p>
                </div>
                <Line 
                    data={{
                        labels: customerNameArr,
                        datasets: [{
                            label: 'Số lượt mua',
                            data: numberOfPurchasesArr,
                            fill: true,
                            borderColor: '#4267b2',
                            tension: 0.1
                        }]
                    }}
                />
            </div>
            
        </div>
    )
}

export default Statistic