import React from 'react'

const SimpleBtn=({title,callback,type})=>{
  
  return (
    <button type={type}  onClick={callback} className='simple-btn'>{title}</button>
  )
}

export default SimpleBtn