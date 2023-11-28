import React, { useEffect, useState } from 'react'
import InfoItem from './component/InfoItem'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'

import { Button, Card, Col, DatePicker, Divider, Image, Row, Select, notification } from 'antd'
import './style.scss'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '~/stores/hook'
import { LocalStorage } from '~/utils/local-storage'
import { IUser } from '~/types/user.interface'
import BlogCarousel from '~/pages/Dashboard/component/BlogCarousel.tsx'
import Giaitri from '~/pages/bogBytag/giaitri/Giaitri.tsx'
import Thethao from '~/pages/bogBytag/thethao/Thethao.tsx'
import Amthuc from '~/pages/bogBytag/amthuc/Amthuc.tsx'
import Congnghe from '~/pages/bogBytag/congnghe/Congnghe.tsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import Meta from 'antd/es/card/Meta'
import { Navigation } from 'swiper/modules'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const currentAuth: IUser | null = LocalStorage.getObject('currentAuth')
  const userGroup = currentAuth?.groupProfiles[0]?.groupCode
  const groupsSate = useAppSelector((state) => state.masterData.groups)
  const [selectedGroup, setSelectedGroup] = useState(userGroup)
  const [hotBlogs, setHotBlogs] = useState<{ id: string; avatar: string; title: string; description: string }[]>([
    {
      id: '1',
      avatar:
        'https://www.sporter.vn/wp-content/uploads/2023/07/Chi-tiet-ao-bayern-munich-san-khach-2023-0-698x400.jpg',
      title: 'Chính thức ra mắt áo đầu Bayen Munchen 2023-2024',
      description:
        'Hùm Xám xứ Bavaria đã giới thiệu áo Bayern Munich sân khách mùa giải 23/24 cùng Adidas trong chuyến du đấu tại Nhật Bản như những thông tin chúng ta được biết trước đó.'
    },
    {
      id: '2',
      avatar:
        'https://www.sporter.vn/wp-content/uploads/2017/06/Chi-tiet-ao-bong-da-arsenal-san-khach-2023-2-698x400.jpg',
      title: 'Chính thức ra mắt áo đầu Arsenal 2023-2024',
      description:
        'Áo Arsenal sân khách mùa giải 23/24 đã được ra mắt vào tháng 7 vừa qua. Với thiết kế và các màu sắc lạ mắt và thu hút, cùng với các bản hợp đồng “Trai đẹp” vừa qua'
    },
    {
      id: '3',
      avatar:
        'https://www.sporter.vn/wp-content/uploads/2017/06/Chi-tiet-ao-man-city-san-khach-mau-ba-2023-0-698x400.jpg',
      title: 'Chính thức ra mắt áo đầu MU 2023-2024',
      description:
        'Cuối tháng bảy vừa qua, hãng thể thao PUMA đã giới thiệu mẫu áo Man City sân khách mẫu ba 23/24, một chiếc áo đấu mới của Tân Vương UCL.'
    },
    {
      id: '4',
      avatar:
        'https://www.sporter.vn/wp-content/uploads/2023/07/Chi-tiet-ao-bayern-munich-san-khach-2023-0-698x400.jpg',
      title: 'Áo đấu đội tuyển Đức 2024',
      description:
        'Hùm Xám xứ Bavaria đã giới thiệu áo Bayern Munich sân khách mùa giải 23/24 cùng Adidas trong chuyến du đấu tại Nhật Bản như những thông tin chúng ta được biết trước đó.'
    }
  ])

  return (
    <div className='dashboard'>
      <h3 className='tw-flex tw-items-center tw-justify-center tw-mb-3 tw-text-2xl tw-font-semibold'>
        Bài viết nổi bật
      </h3>
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className='container'
        spaceBetween={10}
        slidesPerView={3}
      >
        {hotBlogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
              <Card
                hoverable
                style={{ width: '100%', textAlign: 'left', height: 400 }}
                cover={<img alt='example' src={blog.avatar} style={{ height: '50%' }} />}
              >
                <Meta title={blog.title} description={blog.description} />
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <Divider></Divider>
      <Row gutter={[24, 16]} className='dashboard-info'>
        <Col className='container'>
          <div className='section'>
            <div className='section-header'>
              <p className='tw-text-2xl tw-font-semibold'>{t('dashboard.title')}</p>
              <div className='divider'></div>
              <div className='view-all-link'>
                {/* Your "View All" link goes here */}
                <Link to={'./Ẩm thực'} className='no-underline'>
                  {' '}
                  Xem tất cả
                </Link>
              </div>
            </div>
            <InfoItem />
          </div>
        </Col>
      </Row>
      <div className='tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-2 tw-mb-2 tw-bg-gray-50'>
        <Image preview={false} src='https://blogamthuc.tv/wp-content/uploads/2023/03/dai-ly-ve-vinwonders.jpg' alt='' />
      </div>
      <Row gutter={[24, 16]} className='dashboard-info'>
        <Col className='container'>
          <div className='section'>
            <div className='section-header'>
              <p className='tw-text-2xl tw-font-semibold'>{t('dashboard.titleThethao')}</p>
              <div className='divider'></div>
              <div className='view-all-link'>
                {/* Your "View All" link goes here */}
                <Link to={'./Thể thao'} className='no-underline'>
                  {' '}
                  Xem tất cả
                </Link>
              </div>
            </div>
            <Thethao />
          </div>
          <div className='section'>
            <div className='section-header'>
              <p className='tw-text-2xl tw-font-semibold'>{t('dashboard.titleGiaitri')}</p>
              <div className='divider'></div>
              <div className='view-all-link'>
                {/* Your "View All" link goes here */}
                <Link to={'./Giải trí'} className='no-underline'>
                  {' '}
                  Xem tất cả
                </Link>
              </div>
            </div>
            <Giaitri />
          </div>
          <div className='section'>
            <div className='section-header'>
              <p className='tw-text-2xl tw-font-semibold'>{t('dashboard.titleCongnghe')}</p>
              <div className='divider'></div>
              <div className='view-all-link'>
                {/* Your "View All" link goes here */}
                <Link to={'./Công nghệ'} className='no-underline'>
                  {' '}
                  Xem tất cả
                </Link>
              </div>
            </div>
            <Congnghe />
          </div>
          <div className='section'>
            <div className='section-header'>
              <p className='tw-text-2xl tw-font-semibold'>{t('dashboard.titleAmthuc')}</p>
              <div className='divider'></div>
              <div className='view-all-link'>
                {/* Your "View All" link goes here */}
                <Link to={'./Ẩm thực'} className='no-underline'>
                  {' '}
                  Xem tất cả
                </Link>
              </div>
            </div>
            <Amthuc />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
