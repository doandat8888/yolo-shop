const Policy = (props) => {
    let { datas } = props;
    return (
        <div className="policy-container">
            <div className="policy-container-list">
                {datas.map((data, index) => (
                    <div className="policy-container-item" key={index}>
                        <div className="policy-container-item-left">
                            <i className = {`${data.icon} policy-container-item-left-icon`}></i>
                        </div>
                        <div className="policy-container-item-right">
                            <p className="policy-container-item-right-title">{data.name}</p>
                            <p className="policy-container-item-right-description">{data.description}</p>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    )
}


export default Policy