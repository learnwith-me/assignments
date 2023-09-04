import React, { useState } from 'react';
import DocIcon from '../icons/DocIcon';
import KebabIcon from '../icons/KebabIcon';
import ArrowIcon from '../icons/ArrowIcon';
import DummyData from './DummyData';
import { Link } from 'react-router-dom';

const Cards = ({ documents, handleDocumentClick, handleDownload, dummyDocuments }) => {

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
        <div className='document-cards px-10 flex flex-wrap gap-10 mt-5'>

            <DummyData />

            {documents.map((document, index) => (
                <div key={index} className='py-4 px-4 max-w-sm bg-bgTwo rounded-xl shadow-sm relative w-full'>
                    <div className='card-header flex w-full gap-5'>
                        <div className='flex flex-1 gap-5 break-all'>
                            <DocIcon />
                            {document.name}
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
                                <li className='border-b border-[#F0F0F0] py-2 pr-5 pl-10 hover:bg-slate-400 cursor-pointer' onClick={() => handleDocumentClick(document)}>
                                    <Link>Preview</Link>
                                </li>
                                <li className='border-b border-[#F0F0F0] py-2 pr-5 pl-10 hover:bg-slate-400 cursor-pointer' onClick={() => handleDownload(document)}>
                                    <Link>Download</Link>
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
