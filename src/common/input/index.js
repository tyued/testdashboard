import React, { memo, useCallback } from 'react';
import { Checkbox } from 'antd';

const Input = memo(({ 
    id,
    value, 
    type,
    label,
    children=[], 
    onChange,
}) => {
    const props = {
        id,
        value,
        type,
        label,
    }

    const handleChange = useCallback(
        (e) => {
            switch (type) {
                case 'MULTI_SELECT_CONFIG':
                    break;
                default:
                    break;
            }    
        },
        [type],
    )
    


    switch (type) {
        case 'MULTI_SELECT_CONFIG':

            return (
                <React.Fragment key={id}>
                    <div>{label}</div>
                    {children.map(item => {
                        return <div key={item.value}>
                            <Checkbox onChange={(e)=>handleChange(id+'.'+item.id,e.target.checked)}> {item.value}</Checkbox>
                            
                            {/* <input type='checkbox' onChange={(e)=>onChange(id+'.'+item,e.target.checked)}/> {item.value} */}
                        </div>
                    })}
                </React.Fragment>
            )
        default:
            return (
                <div>
                    <input {...props} value={props.value || ''} onChange={(e)=>onChange(id,e.target.value)}/>
                </div>
            )
    }
    
})

export default Input