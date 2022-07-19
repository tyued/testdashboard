
import React, { forwardRef, useImperativeHandle } from 'react';
import { FormContext } from './formContext.js';
import useForm from './useForm';

const Form = ({form, initialValues, onFinish, onFinishFailed, children}, ref) => {
    const formInstance = useForm(form, initialValues);
    const { setCallback, dispatch, ...providerFormInstance } = formInstance;

    console.log(formInstance, 'formInstance');

    setCallback({
        onFinish,
        onFinishFailed,
    })
    useImperativeHandle(ref, ()=> providerFormInstance, [])

    const RenderChildren = <FormContext.Provider value={formInstance}>{children}</FormContext.Provider> 

    return (
        <form>
            {RenderChildren}
        </form>
    )
};

export default forwardRef(Form)