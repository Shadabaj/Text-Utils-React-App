import React, { useEffect, useState, useRef } from 'react'
import AboutUs from './AboutUs';

export default function Datapassing(props) {

  const [counts, SetCount] = useState(0);
  const [text, SetText] = useState('');
  const ThemeContext = React.createContext();
  const inputRef = useRef();

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return (
    <>
      <div>
        <h1>Hello {props.name}</h1>
      </div>
      <input type='button' onClick={() => SetCount(counts + 1)} value={counts}></input>


      <button className='mx-4' onClick={() => alert('Clicked')}>Click Me</button>

      <p>{text}</p>
      <input type='text' value={text} onChange={(e) => SetText(e.target.value)}></input>

      <input ref={inputRef} />
      {/* <ThemeContext.Provider value="dark">
      <AboutUs />
    </ThemeContext.Provider> */}

    </>
  )
}
