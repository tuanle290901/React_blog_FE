import React from 'react'
import { login, Login2 } from '~/stores/features/auth/auth.slice.ts'
import { useAppDispatch } from '~/stores/hook.ts'
import { LoginPayload } from '~/types/login-payload.ts'

import { Button, Col, Form, Input, Row } from 'antd'
import logo from '~/assets/images/blog.png'

import { useLocation, useNavigate, Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import '../../layouts/style.scss'
import { LocalStorage } from '~/utils/local-storage.ts'

const Index: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()

  const onKeyDown = (event: any) => {
    if (event.key === ' ') event.preventDefault()
  }

  const onFinish = async (formValues: LoginPayload) => {
    try {
      const response: any = await Login2(formValues)
      LocalStorage.set('accessToken', response.token)
      LocalStorage.setObject('account', response)
      navigate('../../')
    } catch (e) {
      console.log(e)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='login-container tw-pt-[15%]'>
      <Row className='login-logo-container tw-h-[20%]' align='middle'>
        <Col xs={50} md={{ span: 15, offset: 4 }}>
          <div className='tw-flex tw-justify-center'>
            <img src={logo} alt='logo' className='tw-w-full' />
          </div>
        </Col>
      </Row>

      <Row className='login-title-container tw-h-[12%] tw-flex tw-items-center tw-justify-center'>
        <Col>
          <div className='title-one tw-flex tw-items-center tw-justify-center'>
            <span>{t('auth.hello')}</span>
          </div>
        </Col>
      </Row>

      <div className='login-form-container'>
        <Form
          className='tw-w-full'
          layout={'vertical'}
          name='loginForm'
          autoComplete='off'
          // labelWrap={true}
          labelCol={{ span: 12, offset: 6 }}
          wrapperCol={{ span: 12, offset: 6 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            // label={<div className='tw-font-semibold'>{t('auth.username')}</div>}
            name='email'
            rules={[{ required: true, message: t('auth.fieldIsRequired') }]}
          >
            <Input placeholder={t('auth.username')} className='login-input-custom' onKeyDown={onKeyDown} />
          </Form.Item>

          <Form.Item
            // label={<div className='tw-font-semibold'>{t('auth.password')}</div>}
            name='password'
            rules={[{ required: true, message: t('auth.fieldIsRequired') }]}
          >
            <Input.Password placeholder='Mật khẩu' className='login-input-custom' maxLength={32} />
          </Form.Item>

          {/*<Form.Item wrapperCol={{ xs: 24, md: { span: 16, offset: 4 } }}>*/}
          {/*  <div className='tw-text-end tw-text-sky-500'>{t('auth.forgotPassword')}</div>*/}
          {/*</Form.Item>*/}
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <div className='tw-text-end tw-text-sky-500'>
              <Link to='/auth/register'>{t('auth.register')}</Link>
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button className='login-button tw-w-full tw-mt-4' type='primary' htmlType='submit'>
              {t('auth.login')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Index
