import React from 'react'
import loading from './spinner.gif'

export default function spinner()  {
  
    return (
      <div className = "text-center">
        <img src={loading} alt = "loading"/>
      </div>
    )
  }

