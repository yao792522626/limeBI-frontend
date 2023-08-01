import Footer from '@/components/Footer';
import { getUserByIdUsingGET, userLoginUsingPOST } from '@/services/Lime/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Button, Col, Image, message, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  /**
   *
   登陆成功后，获取用户登陆信息
   *
   **/
  const fetchUserInfo = async () => {
    const userInfo: API.BaseResponseUser_ = await getUserByIdUsingGET();
    if (userInfo) {
      flushSync(() => {
        // 相当于前端的全局状态
        setInitialState((s: any) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        //   登陆失败
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <Row>
      <Col span={12}>
        <div
          className={'picClassName'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
              "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
          }}
        >
          <Image src="https://tinypng.com/images/apng/panda-waving.png" />
        </div>
      </Col>
      <Col span={12}>
        <div className={containerClassName}>
          <Helmet>
            <title>
              {'登录'}- {Settings.title}
            </title>
          </Helmet>

          <div
            style={{
              flex: '1',
              padding: '32px 0',
            }}
          >
            <LoginForm
              contentStyle={{
                minWidth: 280,
                maxWidth: '75vw',
              }}
              logo={<img alt="logo" src="/logo.svg" />}
              title="智能 BI 数据分析平台"
              subTitle={'Panda 智能 BI'}
              // initialValues={{
              //   // 自动登陆功能
              //   autoLogin: true,
              // }}
              // actions={['其他登录方式 :', <ActionIcons key="ico ns" />]}
              onFinish={async (values) => {
                await handleSubmit(values as API.UserLoginRequest);
              }}
            >
              <Tabs
                activeKey={type}
                onChange={setType}
                centered
                items={[
                  {
                    key: 'account',
                    label: '账户密码登录',
                  },
                ]}
              />

              {type === 'account' && (
                <>
                  <ProFormText
                    name="userAccount"
                    fieldProps={{
                      size: 'large',
                      prefix: <UserOutlined />,
                    }}
                    placeholder={'请输入用户名'}
                    rules={[
                      {
                        required: true,
                        message: '用户名是必填项！',
                      },
                    ]}
                  />
                  <ProFormText.Password
                    name="userPassword"
                    fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined />,
                    }}
                    placeholder={'请输入密码'}
                    rules={[
                      {
                        required: true,
                        message: '密码是必填项！',
                      },
                    ]}
                  />
                </>
              )}

              <div
                style={{
                  marginBottom: 24,
                  textAlign: 'center',
                }}
              >
                <Link to="/user/regiter">
                  <Button
                    type="primary"
                    style={{
                      width: '100%',
                      height: 40,
                      fontSize: 16,
                    }}
                  >
                    注册新用户
                  </Button>
                </Link>
              </div>
            </LoginForm>
          </div>
          <Footer />
        </div>
      </Col>
    </Row>
  );
};
export default Login;
