import React, { memo, useEffect, useContext, useState, isValidElement, cloneElement, useMemo } from 'react'
import Label from './Label.js';
import { FormContext } from '../form/formContext.js';

const FormItem = memo(({
    name,
    children,
    label,
    labelWidth,
    required=false,
    rules = {},
    tigger = 'onChange',
}) => {
    const formInstance = useContext(FormContext);
    const { registerValidateFields, dispatch, unRegisterValidate } = formInstance;
    const [, forceUpdate] = useState({});

    const onStoreChange = useMemo(()=>{
        const onStoreChange = {
            changeValue(){
                forceUpdate({});
            }
        }
        return onStoreChange;
    },[ formInstance ])

    useEffect(() => {
        // console.log(name, 'FormItem--useEffect');
        name && registerValidateFields(name, onStoreChange, {...rules, required});
        
        return () => {
            name && unRegisterValidate(name);
        }
    }, [onStoreChange])
    


    const getControlled = (child) => {
        // console.log({...child.props})
        // console.log(name)
        const mergeChildrenProps = {...child.props};
        if(!name) return mergeChildrenProps;
        
        const handleChange = (e) => {
            const value = e.target.value;
            dispatch({type:'setFieldsValue'}, name, value)
        }
        mergeChildrenProps[tigger] = handleChange;

        mergeChildrenProps.value = dispatch({type:'getFieldValue'}, name) || '';
        return mergeChildrenProps;
    }

    let renderChildren;
    if(isValidElement(children)){
        renderChildren = cloneElement(children, getControlled(children))
    } else {
        renderChildren = children;
    }
    // console.log(renderChildren, 'renderChildren')
    return (
        <Label
            label={label}
            labelWidth={labelWidth}
            required={required}
        >
            {renderChildren}
        </Label>
    )
});

export default FormItem