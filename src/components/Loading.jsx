import React from 'react'
import style from "./Loading.module.css"

function Loading() {
  return (
    
    <svg viewBox="25 25 50 50" className={style.svg}>
        <circle r="20" cy="50" cx="50" className={style.circle}></circle>
    </svg>
  )
}

export default Loading