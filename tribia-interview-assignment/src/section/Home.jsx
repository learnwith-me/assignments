import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilesFolder from '../icons/FilesFolder';
import AddIcon from '../icons/AddIcon';
import Cards from '../components/Cards';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CloseIcon from '../icons/CloseIcon';

const Home = () => {
    const [documents, setDocuments] = useState([]);
    const [dummyDocuments, setDummyDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    // Dummy uploaded documents
    const data = [
        { name: 'Sample Document 1.pdf', url: 'https://images.unsplash.com/photo-1683724497249-bc24d5687191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80' },
        { name: 'Sample Document 2.pdf', url: 'https://images.unsplash.com/photo-1683724497249-bc24d5687191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80' },
        { name: 'Sample Document 3.pdf', url: 'https://images.unsplash.com/photo-1683724497249-bc24d5687191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80' },
    ];

    // Initialize documents with dummy documents
    useEffect(() => {
        setDummyDocuments(data);
    }, []);

    const handleDocumentClick = (document) => {
        setSelectedDocument(document);
    };

    const closePopup = () => {
        setSelectedDocument(null); // Use null instead of false
    };

    const handleUpload = (e) => {
        const newDocuments = [...documents];

        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            newDocuments.push(file);
            // Notify the user of the upload status
            NotificationManager.success(`Uploaded: ${file.name}`, 'Document Upload');
        }

        setDocuments(newDocuments);
    };

    const handleDownload = (document) => {
        const blobURL = window.URL.createObjectURL(document);
        window.open(blobURL, '_blank');
        window.URL.revokeObjectURL(blobURL);

        // Show a notification when the file is downloaded
        NotificationManager.info(`Downloaded: ${document.name}`, 'Document Download');
    };

    return (
        <main>
            {/* Header */}
            <Header />

            {/* Container */}
            <div className='document-container relative px-5 md:px-10'>
                <h2 className='flex md:block gap-5 document-tab absolute bg-bgOne rounded-[30px] top-[-53px] left-[58px] md:left-[98px] pr-[25px] md:pr-[30px] pl-[30px] pt-5 pb-[90px] text-secondaryColor font-poppins text-base md:text-xl font-medium -z-10'>
                    <span className='hidden md:block'>Organize your documents</span>
                    <span className='block md:hidden'>Documents</span>
                </h2>

                <div className='document-file-container bg-bgOne rounded-[30px] mt-[70px] h-full min-h-screen w-full md:w-[calc(100vw-80px)] mb-[50px] pb-10'>
                    <div className='document-add flex justify-end items-center pt-5 pr-5'>
                        <div className="file-input ">
                            <input
                                type="file"
                                name="file-input"
                                id="file-input"
                                className='w-[0.1px] h-[0.2px] opacity-0 overflow-hidden absolute -z-[-1]'
                                multiple
                                onChange={handleUpload}
                            />
                            <label className="cursor-pointer inline-flex items-center rounded-[20px] gap-2 text-sm py-[10px] px-3 bg-btnColor" htmlFor="file-input">
                                <AddIcon />
                                <span className=''>Choose File</span>
                            </label>
                        </div>
                        {selectedDocument && (
                            <div className="document-preview left-0 z-[9999] bg-[#00000080] top-[0] fixed flex justify-center w-full h-full p-14">
                                <span className='closePopup z-[9] absolute w-5 top-[26px] cursor-pointer' onClick={closePopup}>
                                    <CloseIcon />
                                </span>
                                <iframe
                                    src={window.URL.createObjectURL(selectedDocument)}
                                    title="Document Preview"
                                    className='w-full h-full'
                                />
                            </div>
                        )}
                        <NotificationContainer />
                    </div>
                    <div className={`relative flex justify-center items-baseline ${documents.length === 0 ? 'block' : 'hidden'}`}>
                        <FilesFolder />
                    </div>
                    <Cards documents={documents} dummyDocuments={dummyDocuments} handleDocumentClick={handleDocumentClick} handleDownload={handleDownload} />
                </div>
            </div>
        </main>
    );
};

export default Home;
