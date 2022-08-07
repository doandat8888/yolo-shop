import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {

    const bg = props.backgroundColor ? `bg-${props.backgroundColor} ` : 'bg-main' 
    const size = props.size ? `btn-${props.size}` : ''
    const animate = props.animate ? 'animate' : ''
    const onClick = props.onClick ? props.onClick : null

    return (
        <button 
            className = {`btn ${bg} ${size} ${animate}`} 
            onClick = {onClick}
        >
            <span className = 'btn__text'>{props.children}</span>
                {
                    props.icon ? (
                    <span className = 'btn__cart'>
                        <i className = {`bx-tada ${props.icon}`}></i>
                    </span>
                    ) : null
                }
        </button>
    )
}

export default Button

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
}


