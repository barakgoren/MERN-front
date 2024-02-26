import React, { useState } from 'react'
import { IoMdCloudUpload } from 'react-icons/io';

export default function FileUpload(props) {
    const [fileSelected, setFileSelected] = useState(false);

    const handleFileChange = (event) => {
        setFileSelected(event.target.files.length > 0);
        const file = event.target.files[0];
        props.handleFileChange(file);
    };
    
    return (
        <div className="FileUpload">
            <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                className='bg-danger'
                accept="image/*"
            />
            <label
                htmlFor="file-upload"
                className={fileSelected ? 'btn rounded rounded-3 bg-success text-white' : 'btn rounded rounded-3 bg-secondary text-white'}
            >
                <IoMdCloudUpload className='mx-1 mb-1 fs-4' />Upload File
            </label>
        </div>
    );
}
