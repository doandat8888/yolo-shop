import formatNumber from '../utils/formatNumber';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateItems, removeItem } from '../redux/cart-item/cartItemSlice';

const CartItem = (props) => {
    const {item} = props;
    const {isOrdering} = props;
    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch();

    const updateQuantity = (type) => {
        switch(type) {
            case 'UP':
                setQuantity(quantity + 1);
                dispatch(updateItems({
                    color: item.color,
                    quantity: quantity + 1,
                    size: item.size,
                    slug: item.slug
                }))
                break;
            case 'DOWN':
                setQuantity(quantity === 1 ? 1 : quantity - 1);
                dispatch(updateItems({
                    color: item.color,
                    quantity: quantity === 1 ? quantity : quantity - 1,
                    size: item.size,
                    slug: item.slug
                }))
                break;
        }
    }

    const removeCartItem = () => {
        dispatch(removeItem({
            color: item.color,
            size: item.size,
            slug: item.slug
        }))
    }

    useEffect(() => {
        setQuantity(item.quantity)
    }, [item.quantity])
    return (
        <div className="cart-container-body-right-item">
            <div className="cart-container-body-right-item-img">
                <img src={item.product.image01} className="cart-container-body-right-item-img-content"/>
            </div>
            <div className={`cart-container-body-right-item-body `}>
                <div className={`cart-container-body-right-item-info ${isOrdering === true ? 'order' : ''}`}>{item.product.title} - {item.color} - {item.size}</div>
                <div className={`cart-container-body-right-item-price ${isOrdering === true ? 'order' : ''}`}>{formatNumber(item.product.price)}</div>
                <div className="cart-container-body-right-item-quantity">
                    <div className="cart-container-body-right-item-quantity-item-left"><i className = 'bx bx-minus' onClick={() => updateQuantity("DOWN")}></i></div>
                    <div className="cart-container-body-right-item-quantity-item-middle">{quantity}</div>
                    <div className="cart-container-body-right-item-quantity-item-right"><i className = 'bx bx-plus' onClick={() => updateQuantity("UP")}></i></div>
                </div>
                <div className="cart-container-body-right-item-icon">
                    <i className = 'bx bx-trash cart-container-body-right-item-icon-content' onClick={removeCartItem}></i>
                </div>
            </div>
        </div>
    )
}

export default CartItem