import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({input, setInput}) => {
    const quillRef = useRef(null);

    const handleChange = (content) => {
        setInput({...input, description:content});
    }
   
    return (
        <div ref={quillRef}>
            <ReactQuill 
                theme="snow" 
                value={input.description} 
                onChange={handleChange}
                ref={quillRef}
            />
        </div>
    );
}

export default RichTextEditor;