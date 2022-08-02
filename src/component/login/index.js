import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './index.module.scss';
import { Button, Input, Form, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { useDebounce } from '../../utils/tools';
import { login } from '../../api/index';

const Login = ({form, dispatch}) => {
  const history = useNavigate();
  const [isLoad, setIsLoad] = useState(false);

  const handleLogin = useDebounce(async (values) => {
    
    let { data } = await login(values);
    if(data.code===200){
      sessionStorage.setItem('hierarchyId', data.hierarchy);
      sessionStorage.setItem('session_id', data.session_id);
      sessionStorage.setItem('hierarchyName', data.hierarchyName);
      history('/dashboard');
    } else {
      notification.error({
        message: data.data.msg,
        // description: data.data.msg,
        placement: 'bottomRight',
      })
    }
  },500)

  return (
    <div className={css.loginPage}>
      <div className={css.loginMain}>
        <div className={css.loginTitle}>
          Citcon
        </div>
        <div className={css.loginBox}>
          <div className={css.subTitle}>Sign in to start your session</div>
          <Form
            className='pt15'
            name='loginForm'
            onFinish={handleLogin}
          >
            <Form.Item name='email'>
              <Input addonAfter={<MailOutlined />} />
            </Form.Item>
            <Form.Item name='password'>
              <Input.Password visibilityToggle={false} addonAfter={<LockOutlined />} />
            </Form.Item>
            <div>
              <a>Forgot Your Password</a>
            </div>
            <div className='pt5 textCenter'>
                <Button type='primary' htmlType="submit">Sign In</Button>
            </div>
          </Form>
        </div>
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

