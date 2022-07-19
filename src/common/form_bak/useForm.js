import { useRef, useState } from 'react';
import FormStore from './formStore';

function useForm(form, defaultFormValue = {}){
    const formRef = useRef(null);
    const [, forceUpdate] = useState({});
    if(!formRef.current) {
        if(form){
            formRef.current = form;  /* 如果已经有 form，那么复用当前 form  */
        } else {
            const formStoreCurrent = new FormStore(forceUpdate, defaultFormValue);
            formRef.current = formStoreCurrent.getForm();
        }
    }
    return formRef.current;
}

export default useForm;