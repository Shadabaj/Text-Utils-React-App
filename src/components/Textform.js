import React, { useState } from 'react';

export default function Textform(props) {

    const [text, setText] = useState('');

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Text Updated to the UpperCase","success");
    };

    const handleLowerClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert('Text Updated to the LowerCase','success');
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleClearClick = (event) => {
        let newText ='';
        setText(newText);
        props.showAlert('Text Cleared','warning');
    };


    return (
        <>
            <div className='container'>
                <h1>{props.heading}</h1>

                <div className="mb-3">
                    <label className="form-label">Example Text Area</label>
                    <textarea
                        className="form-control"
                        id="myBox"
                        rows="8"
                        value={text}
                        onChange={handleOnChange}
                        style={{backgroundColor:props.Mode==='dark'?'grey':'white'}}>
                    </textarea>
                </div>

                <button
                    className='btn btn-primary'
                    onClick={handleUpClick}>
                    Convert To Upper Case
                </button>

                <button
                    className='btn btn-secondary mx-2'
                    onClick={handleLowerClick}>
                    Convert To Lower Case
                </button>

                <button
                    className='btn btn-primary mx-2'
                    onClick={handleClearClick}>
                    Clear 
                </button>
            </div>

            <div className='container my-3'>
                <h1>Your Text Summary</h1>
                <p>{text.split(' ').filter((element)=>{return element.length !=0}).length} Words and {text.length} Characters</p>
                <p>{0.008 * text.split(' ').length} Minutes Read</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:''}</p>
            </div>
        </>
    );
}