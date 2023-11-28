/* eslint-disable jsx-a11y/anchor-is-valid */
import { Layout, Menu, Button, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import logo from '~/assets/images/blog.png'
import { MenuProps } from 'antd/lib'
import { LocalStorage } from '~/utils/local-storage.ts'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Divider, Tooltip, Avatar, Space } from 'antd'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import ChangePassword from '~/pages/change-password/change-password.tsx'
import { KeyOutlined } from '@ant-design/icons'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MDBFooter, MDBContainer, MDBCol, MDBRow, MDBIcon, MDBBtn } from 'mdb-react-ui-kit'
import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'
import menu_food from '~/assets/images/menu-food.png'
import menu_tech from '~/assets/images/menu_tech.jpg'
import Dashboard from '~/pages/Dashboard'

const { Search } = Input

const { Header, Content, Footer } = Layout

const MainLayout: React.FC = () => {
  const [changePasswordVisible, setChangePasswordVisible] = useState<boolean>(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const account: Account | null = JSON.parse(localStorage.getItem('account') || '{}')

  interface Role {
    id: number
  }

  interface Account {
    id?: any
    email: string
    password: string
    name: string
    address: string
    phoneNumber: string
    img: string
    role: Role
  }

  useEffect(() => {
    const accessToken = LocalStorage.get('accessToken')
    setIsLoggedIn(!!accessToken)
  }, [])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value)

    // Redirect to the searchDetail page with the search query
    navigate(`/search/${value}`)
  }
  const showChangePasswordModal = () => {
    setChangePasswordVisible(true)
  }
  const handleCancelChangePassword = () => {
    setChangePasswordVisible(false)
  }
  const handleBlog1 = () => {
    navigate('../Ẩm thực')
  }
  const handleBlog2 = () => {
    navigate('../Công nghệ')
  }
  const handleBlog3 = () => {
    navigate('../Giải trí')
  }
  const handleBlog4 = () => {
    navigate('../Thể thao')
  }
  const hankeCreateBlog = () => {
    navigate('../create')
  }
  const goHome = () => {
    navigate('../')
  }
  const handleLogout = () => {
    LocalStorage.remove('accessToken')
    LocalStorage.remove('account')
    setIsLoggedIn(false)
    window.location.reload()
  }

  const getMenuItems = () => [
    {
      label: 'Xem thông tin cá nhân',
      key: '1'
    },
    {
      label: 'Đổi mật khẩu',
      key: '2',
      onClick: showChangePasswordModal
    },
    {
      label: 'Đăng xuất',
      key: '3',
      onClick: handleLogout
    }
  ]

  const renderUserSection = (): JSX.Element => {
    if (isLoggedIn) {
      return (
        <div>
          <Dropdown menu={{ items: getMenuItems() }}>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 100,
                marginTop: 20
              }}
            >
              <Avatar.Group maxCount={2} size='large' maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=3' />
                {account?.name}
              </Avatar.Group>
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      )
    } else {
      return (
        <div className='right d-flex justify-content-end align-items-center tw-w-1/6'>
          <Link to='/auth/login'>
            <Button>Đăng nhập</Button>
          </Link>
        </div>
      )
    }
  }

  const menuItems: MenuProps['items'] = [
    {
      label: 'Home',
      key: '/',
      onClick: goHome
    },
    {
      label: 'Blog category',
      key: 'Tag:1',
      children: [
        {
          label: 'Cooking',
          key: 'Tag:2',
          onClick: handleBlog1
        },
        {
          label: 'Technology',
          key: 'Tag:3',
          onClick: handleBlog2
        },
        {
          label: 'Entertainment',
          key: 'Tag:4',
          onClick: handleBlog3
        },
        {
          label: 'Sport',
          key: 'Tag:5',
          onClick: handleBlog4
        }
      ]
    },

    {
      label: 'My blog',
      key: 'SubMenuBlog',
      children: [
        {
          label: 'Blog management',
          key: 'Blog:1',
          onClick: () => navigate(`/BlogByAccount/${account?.id}`)
        },
        {
          label: 'Create blog',
          key: 'Blog:2',
          onClick: hankeCreateBlog
        }
      ]
    },
    {
      label: 'About',
      key: '/about',
      onClick: goHome
    },
    {
      label: 'Contact',
      key: 'contact',
      onClick: handleBlog1
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          1st menu item
        </a>
      )
    }
  ]

  return (
    <Layout className='app-container tw-min-h-screen'>
      <Header style={{ background: 'white', height: 80 }}>
        <div className='tw-w-full tw-h-full tw-flex tw-items-center'>
          <div className='left tw-w-1/6 tw-flex tw-items-center'>
            <img style={{ height: 40 }} src={logo} alt='Logo' onClick={goHome} />
          </div>

          <div className='center tw-w-4/6 '>
            <Menu
              className='tw-w-full'
              mode='horizontal'
              items={menuItems}
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </div>

          <div className='right tw-w-1/6 '>
            <Dropdown menu={{ items: getMenuItems() }} trigger={['click']} className='tw-flex tw-items-center'>
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span className='tw-font-bold'>{account?.name}</span>
                <Avatar
                  className='tw-cursor-pointer'
                  size={40}
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              </Space>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content className='content-container'>
        <Outlet />
      </Content>
      <Footer>
        <MDBFooter className='bg-dark text-center text-white'>
          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2023 Copyright:
            <p className='text-white'>Blog</p>
          </div>
        </MDBFooter>
      </Footer>
      <ChangePassword showModal={changePasswordVisible} handClose={handleCancelChangePassword} />
    </Layout>
  )
}

export default MainLayout
