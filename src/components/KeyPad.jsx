import React, { useState, useEffect } from 'react'

const KeyPad = props => {
  // prettier-ignore
  return <button 
          className={props.className}
          value={props.value}
          onClick={props.handleKeyClick}
         >{props.label}</button>
}

export default KeyPad
