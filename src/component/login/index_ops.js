import React, { useRef, useState } from 'react';
import css from './index.module.scss';
import Form from '../../common/form';
import { connect } from 'react-redux';
// import Input from '../../common/formItem/Input';
// import FormItem from '../../common/formItem';
import { account_information, service, internal_status } from '../../utils/constants';
import { merge, cloneDeep } from 'lodash';

const Login = ({form, dispatch}) => {
  
  // const [merchant, setMerchant] = useState(defaultMerchant)

  console.log(form.merchant, 'merchant');
  // console.log(dispatch, '222')

  // const form = useRef(null);
  // const form2 = useRef(null);

  const handlGetValue = () => {
    // console.log(form.current.getFieldValue('username'), 'form.current');
    // console.log(merge(cloneDeep(form),{ 
    //       merchant:{
    //         internal_status:{
    //           fd_number:'20'
    //         }
    //       }
    //     })
    // )
    dispatch({type:'form/setState',payload:
      merge(cloneDeep(form),{ 
        merchant:{
          internal_status:{
            fd_number:'20'
          }
        }
      })
    })
  }

  const handlGetValue2 = () => {
    // console.log(form.current.getFieldValue('username'), 'form.current');
    dispatch({type:'form/setState',payload:
      merge(cloneDeep(form),{ 
        merchant:{
          internal_status:{
            jira_number:'r0'
          }
        }
      })
    })
  }

  console.log('render login~~')
  return (
    <div className={css.loginPage}>
      <div className={css.loginMain}>
        <div className={css.loginTitle}>
          Citcon
        </div>
        <div className={css.loginBox}>
          <div className={css.subTitle}>Sign in to start your session</div>
          {/* <Form 
            value={form.merchant.internal_status} 
            formName={'merchant'}
            id={'internal_status'}
            fields={[...internal_status]}
          >

          </Form>

          <Form 
            value={form.merchant.account_info} 
            formName={'merchant'}
            id={'account_info'}
            fields={[...account_information]}
          >
          </Form> */}

          <Form
            value={form.merchant.service}
            formName={'merchant'}
            id={'service'}
            fields={[...service]}
          >

          </Form>
          {/* <Form ref={form}>
              <FormItem label='UserName' labelWidth={'.5rem'} name='username' required trigger='onChange'>
                  <Input placeholder='please input username' />
              </FormItem>
          </Form> */}

          {/* <Form ref={form2}>
              <FormItem label='Task' labelWidth={'.5rem'} name='task' required trigger='onChange'>
                  <Input placeholder='please input username' />
              </FormItem>
          </Form> */}
        </div>
        <button onClick={handlGetValue}>Get Form Data</button>
        <button onClick={handlGetValue2}>Get Form Data</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { form } = state;
  return { form };
}

// export default connect(mapStateToProps)(PermissionHoc('List')(List))

export default connect(mapStateToProps)(Login);

