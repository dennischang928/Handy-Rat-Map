import React, { useEffect, useState } from 'react';

const ImageViewer = ({ ImageSrc, LoaderEnable }) => {
    const [DisplayingImageIndex, setDisplayingImageIndex] = useState(0);

    const OnLeftArrowClicked = () => {
        if (DisplayingImageIndex === 0) return;
        setDisplayingImageIndex(DisplayingImageIndex - 1);
    }

    const OnRigthArrowClicked = () => {
        if (DisplayingImageIndex === ImageSrc.length - 1) return;
        setDisplayingImageIndex(DisplayingImageIndex + 1);
    }

    useEffect(() => {
        setDisplayingImageIndex(0);
    }, [LoaderEnable])

    const ImageEmbed = () => {
        console.log(ImageSrc);
        if (LoaderEnable === true) {
            return (
                <img
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        Width: "auto",
                        height: "auto"
                    }}
                    src={ImageSrc.length !== 0 ? ImageSrc[DisplayingImageIndex] : "https://www.wddonline.com/content/uploads/2020/08/placeholder-image.png"}
                />
            )
        } else {
            return (
                <div id="Image" className="ui segment"
                    style={{
                        display: "block",
                        maxWidth: "auto",
                        Width: "auto",
                        height: "200px",
                    }}
                >
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
                    <p></p>
                </div>
            );
        }
    }
    return (
        <div className="row">
            <div className="two wide column">
                <i
                    onClick={OnLeftArrowClicked}
                    style={{
                        position: "absolute",

                        left: '50%',
                        bottom: '50%',
                        transform: "Scale(2)",

                        cursor: 'pointer'
                    }}
                    className="caret square left icon"></i>
            </div>
            <div className="twelve wide column">
                {ImageEmbed()}
            </div>
            <div className="two wide column">
                <i
                    onClick={OnRigthArrowClicked}
                    style={{
                        position: "absolute",

                        right: '50%',
                        bottom: '50%',
                        transform: "Scale(2)",
                        
                        cursor: 'pointer'
                    }}
                    className="caret square right icon" ></i>
            </div>
        </div >

    )
}

export default ImageViewer;









