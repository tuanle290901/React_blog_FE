import { Layout, Menu, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import logo from '~/assets/images/logo.png'
import { MenuProps } from 'antd/lib'
import { LocalStorage } from '~/utils/local-storage.ts'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Divider, Tooltip, Avatar, Space } from 'antd'
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import ChangePassword from '~/pages/change-password/change-password.tsx'
import { KeyOutlined } from '@ant-design/icons'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Input } from 'antd';
import type { SearchProps } from '../Search';

const { Search } = Input;


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
    console.log(info?.source, value);

    // Redirect to the searchDetail page with the search query
    navigate(`/search/${value}`);
  };
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
            <Space style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:100, marginTop:20  }}>
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
      label: 'Blog Của tôi',
      key: 'SubMenuBlog',
      icon: <SettingOutlined />,
      children: [
        {
          label: 'Quản lý blog cá nhân',
          key: 'Blog:1',
          onClick: () => navigate(`/BlogByAccount/${account?.id}`)

        },
        {
          label: 'Tạo blog mới',
          key: 'Blog:2',
          onClick: hankeCreateBlog
        }
      ]
    },
    {
      label: 'Chủ đề:',
      key: 'SubMenuTag',
      icon: <SettingOutlined />,
      children: [
        {
          label: 'Blog ẩm thực',
          key: 'Tag:1',
          onClick: handleBlog1
        },
        {
          label: 'Blog công nghệ',
          key: 'Tag:2',
          onClick: handleBlog2
        },
        {
          label: 'Blog giải trí',
          key: 'Tag:3',
          onClick: handleBlog3
        },
        {
          label: 'Blog thể thao',
          key: 'Tag:4',
          onClick: handleBlog4
        }
      ]
    }
  ]

  return (
    <Layout className='app-container tw-min-h-screen'>
      <Header style={{ background: 'white', height: 80 }}>
        <div className='d-flex align-items-center' style={{ height: 60 }}>
          <div className='left d-flex align-items-center tw-w-1/6'>
            <img style={{ height: 40 }} src={logo} alt='Logo' onClick={goHome} />
          </div>
          <div className='center tw-w-4/6'>
            <Menu
              className='tw-w-full'
              mode='horizontal'
              items={menuItems}
              style={{ display: 'flex', justifyContent: 'center', }}
            />
          </div>
          <div className='center tw-w-4/6 d-flex align-items-center'>
            <Search
              placeholder="Tìm kiếm..."
              onSearch={onSearch}
              enterButton
              style={{

                width: '50%',
                marginLeft: '10px',
              }}
            />
          </div>

          {renderUserSection()}
        </div>
      </Header>
      <Content className='content-container'>
        <Outlet />
      </Content>
      <Footer>
        <MDBFooter className='bg-dark text-center text-white'>
          <MDBContainer className='p-4 pb-0'>
            <section className='mb-4'>
              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='google' />
              </MDBBtn>
              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='instagram' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='github' />
              </MDBBtn>
            </section>
          </MDBContainer>

          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2023 Copyright:
            <p className='text-white' >
              Blog
            </p>
          </div>
        </MDBFooter>
      </Footer>
      <ChangePassword showModal={changePasswordVisible} handClose={handleCancelChangePassword} />
    </Layout>
  )
}

export default MainLayout