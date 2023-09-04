import React, { useEffect, useState } from 'react';
import DocIcon from '../icons/DocIcon';
import KebabIcon from '../icons/KebabIcon';
import ArrowIcon from '../icons/ArrowIcon';
import { fetchDummyData } from '../config';
import CloseIcon from '../icons/CloseIcon';
import { Link } from 'react-router-dom';

const DummyData = () => {
    
    const [dummyData, setDummyData] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const toggleDropdown = (index) => {
        if (openDropdownIndex === index) {
            // If the same item is clicked again, close the dropdown
            setOpenDropdownIndex(null);
        } else {
            // Otherwise, open the dropdown for the clicked item
            setOpenDropdownIndex(index);
        }
    };

    useEffect(() => {
        fetchDummyData()
            .then((data) => {
                // Use slice to get the first 3 products
                const firstThreeProducts = data?.data?.products.slice(0, 3);
                setDummyData(firstThreeProducts);
            })
            .catch(console.error);
    }, []);

    const openPreviewPopup = (url) => {
        setPreviewImage(url);
    };

    const closePreviewPopup = () => {
        setPreviewImage(null);
    };

    return (
        <>
            {dummyData?.map((data, index) => (
                <div key={index} className='py-4 px-4 max-w-sm bg-bgTwo rounded-xl shadow-sm relative w-full'>
                    <div className='card-header flex w-full gap-5'>
                        <div className='flex flex-1 gap-5 break-all'>
                            <DocIcon />
                            {data.title}
                        </div>
                        <div className='flex'>
                            <Link onClick={() => toggleDropdown(index)}>
                                <KebabIcon />
                            </Link>
                          
                        </div>
                    </div>

                    {openDropdownIndex === index && (
                        <div className='card-dropdown absolute bg-white right-0 top-full mt-2 z-[999]'>
                            <span className='absolute top-[-8px] right-3 z-[-1]'>
                                <ArrowIcon />
                            </span>
                            <ul className='border border-[#F0F0F0]'>
                                <li className='border-b border-[#F0F0F0] py-2 pr-5 pl-10 hover:bg-slate-400 cursor-pointer' onClick={() => openPreviewPopup(data.thumbnail)}>
                                    <Link>Preview</Link>
                                </li>
                                <li className='border-b border-[#F0F0F0] py-2 pr-5 pl-10 hover:bg-slate-400 cursor-pointer' download={`file_${index}.jpg`}>
                                    <Link to={data.thumbnail} >Download</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            {/* Preview Popup */}
            {previewImage && (
                <div className="preview-popup  left-0 z-[9999] bg-[#00000080] top-[0] fixed flex justify-center w-full h-full p-14">
                    <div className="popup-content">
                        <img src={previewImage} alt="Preview" />
                        <a className='closePopup z-[9] absolute w-full flex left-0 justify-center top-[26px] cursor-pointer' onClick={closePreviewPopup}>
                            <span className='w-5'><CloseIcon /></span>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default DummyData;
