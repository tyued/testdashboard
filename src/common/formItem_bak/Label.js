import React, { memo } from 'react'

const Label = memo(({
    label,
    labelWidth,
    required,
    children,
})=>{
  return (
    <div>
        <div>{label}</div> {children}
    </div>
  )
})

export default Label