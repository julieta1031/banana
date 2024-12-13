import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { HiFolderArrowDown } from "react-icons/hi2";

const ImageUploader = ({ images, setImages, maxNumber = 69 }) => {
    const [selectedImage, setSelectedImage] = useState(null); // Պահելու համար ընտրված նկարը

    const onChange = (imageList) => {
        setImages(imageList);
        if (imageList.length > 0) {
            setSelectedImage(imageList[0].data_url); // Պահպանում ենք առաջին նկարը որպես ընտրված
        } else {
            setSelectedImage(null); // Եթե նկար չկա, մաքրում ենք ընտրված նկարը
        }
    };

    return (
        <div className="image-uploader">
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageUpdate,
                      isDragging,
                      dragProps,
                  }) => (
                    <div className="upload__image-wrapper">
                        <button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <HiFolderArrowDown className='w-[70px] h-[40px] hover:text-red-700' />
                        </button>
                        <div className="image-preview">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    {/*<img src={image['data_url']} alt={`uploaded ${index}`} width="100" />*/}
                                    <div >
                                        <button onClick={() => onImageUpdate(index)}
                                                className="border border-black rounded-xl w-[80px] bg-red-600 hover:text-white"
                                        >Update</button>
                                        {/*<button onClick={() => setSelectedImage(image.data_url)}*/}
                                        {/*        className="border border-black rounded-xl w-[80px] bg-red-600 hover:text-white"*/}
                                        {/*>Select</button>*/}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>

            {selectedImage && (
                <div className="selected-image w-[150px] h-[200px]">

                    <img src={selectedImage} alt="Selected" width="200 "  />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
