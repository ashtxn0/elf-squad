import React from 'react'

export default function Navbar(props) {
    return (
    
    <nav>
        <div className='logoContainer'>
            <img alt='elf logo' height="80px" src={props.src}/>
            <h2>Elf Squad</h2>
        </div>
        {/* <h4 className='task'>Gallery</h4>
        <h4 className='task'>Contact</h4> */}

    </nav>
  )
}
