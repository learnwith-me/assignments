import React, { useState } from 'react';
import DocIcon from '../icons/DocIcon';
import KebabIcon from '../icons/KebabIcon';
import ArrowIcon from '../icons/ArrowIcon';

const Cards = ({ documents, handleDrop, handleDocumentClick, handleDownload }) => {
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

    return (
        <div className='document-cards px-10 flex flex-wrap gap-10'>
            {documents.map((document, index) => (
                <div key={index} className='py-4 px-4 max-w-sm bg-bgTwo rounded-xl shadow-sm relative'>
                    <div className='card-header flex w-full gap-5'>
                        <div className='flex flex-1 gap-5'>
                            <DocIcon />
                            {document.name}
                        </div>
                        <div className='flex'>
                            <a href="#" onClick={() => toggleDropdown(index)}>
                                <KebabIcon />
                            </a>
                        </div>
                    </div>
                    
                    {openDropdownIndex === index && (
                        <div className='card-dropdown absolute bg-white right-0 top-full mt-2 z-[999]'>
                            <span className='absolute top-[-8px] right-3 z-[-1]'>
                                <ArrowIcon />
                            </span>
                            <ul className='border border-[#F0F0F0]'>
                                <li className='border-b border-[#F0F0F0] py-2 pr-5 pl-10 hover:bg-slate-400 cursor-pointer' onClick={() => handleDocumentClick(document)}>
                                    <a href="#">Preview</a>
                                </li>
                                <li className='border-b border-[#F0F0F0] py-2 pr-5 pl-10 hover:bg-slate-400 cursor-pointer' onClick={() => handleDownload(document)}>
                                    <a href="#">Download</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Cards;
