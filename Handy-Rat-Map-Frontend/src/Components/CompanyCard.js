import { useEffect, useState } from "react";
import { Transition } from "semantic-ui-react";
import ImageViewer from "./ImageViewer";


const CompanyCard = ({ Company, State, onClosed }) => {

    const ShopTypeOptions = [
        {
            value: "BAR",
            name: "Bar"
        },
        {
            value: "RESTR",
            name: "Restaurant"
        },
        {
            value: "SMKT",
            name: "Supermarket"
        },
        {
            value: "BTQ",
            name: "Boutique"
        },
        {
            value: "SCH",
            name: "School"
        }
    ];

    const [ShopTypeValue, setShopTypeValue] = useState();

    useEffect(() => {
        const ShopType = ShopTypeOptions.filter((e) => {
            return e.value === Company.ShopType;
        })[0]

        if (ShopType) {
            setShopTypeValue(ShopType.name);
        }
    }, [Company])

    console.log(Company.ImageSrc);
    return (
        <Transition visible={State !== 0 ? true : false} animation="scale" duration={500}>
            <div
                className="ui segment"
                style={{
                    height: 'auto',
                    zIndex: "2",
                    position: "fixed",

                    top: "5%",
                    bottom: "5%",

                    left: "5%",
                    right: "5%"
                }}
            >

                <button
                    className="ui grey small labeled icon button"
                    onClick={onClosed}>
                    <i className="reply icon"></i>
                    Back
                </button>
                <div
                    className="ui grey large label"
                    style={{ position: "absolute", right: "10px" }}>
                    <i className="home icon"></i> {ShopTypeValue}
                </div>
                <div
                    style={{ grid: "10px", padding: "10px", height: '100%', overflow: 'scroll' }}
                    className="ui grid"
                >
                    <ImageViewer
                        ImageSrc={Company.ImageSrc}
                        LoaderEnable={State === 2 ? true : false}
                    />
                    <div className="row">
                        <div className='column'>
                            <h2>{Company.ShopName}</h2>
                            <p style={{ wordWrap: "break-word" }}>{Company.ShopDescription}</p>
                            <p style={{ color: "blue" }}>
                                {Company.Addr}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition >
    )
}

export default CompanyCard