import React, { memo } from 'react'

const Input = memo((props) => {
    // console.log(props, 'props')
    return (
        <input {...props} />
    )
})

export default Input
