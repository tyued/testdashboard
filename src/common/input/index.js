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
        (id, e) => {
            console.log(id, 'input-id');
            console.log(e, 'input-e');
            switch (type) {
                case 'MULTI_SELECT_CONFIG':
                    onChange(id,[['ebanx','mexioc','oxxo']])
                    break;
                default:
                    break;
            }    
        },
        [type]
    )
    


    switch (type) {
        case 'MULTI_SELECT_CONFIG':

            return (
                <React.Fragment key={id}>
                    <div>{label}</div>
                    {children.map(item => {
                        return <div key={item.value}>
                            <Checkbox onChange={(e)=>handleChange(id+'.'+item.id, e)}> {item.value}</Checkbox>
                            <div style={{paddingLeft:20}}>{item.children && <Input {...item} value={item.id} id={id+'.'+item.id} onChange={onChange}/>}</div>
                            
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