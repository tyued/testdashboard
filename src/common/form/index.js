import React, { useState, memo, useCallback } from 'react';
import { connect } from 'react-redux';
import Input from '../input';
import { merge, cloneDeep } from 'lodash';

const Form = memo((({
    form,
    dispatch,
    value = {},
    id,
    fields,
    formName,
}) => {
    
    // const [section, setSection] = useState(value)

    console.log(form, 'formValue');
    // console.log(id, 'id');
    // console.log(fields, 'fields');
    
    const onChange = useCallback(
        (sectionKey, val) => {
            // console.log(formValue, 'formValue');
            // console.log(formName, 'formName');
            console.log(sectionKey, 'sectionKey');
            console.log(val, 'val');
            // dispatch({type:'form/setState',payload:
            //     merge(cloneDeep(form),{
            //         [formName]:{
            //         [id]:{
            //             [sectionKey]: val
            //         }
            //         }
            //     })
            // })
        },
        [dispatch, form, formName, id]
    )
    
    return (
        <div>
            {fields.map((field) => {
                return (
                    <React.Fragment key={field.id}>
                        <Input {...field} value={value[field.id]} onChange={onChange}/>
                    </React.Fragment>
                )
            })}
        </div>
    )
}));

const mapStateToProps = (state) => {
    const { form } = state;
    return { form };
  }

export default connect(mapStateToProps)(Form)
