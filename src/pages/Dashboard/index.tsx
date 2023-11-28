import React, { useEffect, useState } from 'react'
import InfoItem from './component/InfoItem'
import { Link } from 'react-router-dom'

import { Button, Col, DatePicker, Row, Select, notification } from 'antd'
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

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const currentAuth: IUser | null = LocalStorage.getObject('currentAuth')
  const userGroup = currentAuth?.groupProfiles[0]?.groupCode
  const groupsSate = useAppSelector((state) => state.masterData.groups)
  const [selectedGroup, setSelectedGroup] = useState(userGroup)

  return (
    <div className='dashboard'>
      <Row gutter={[24, 16]} className='dashboard-filter'></Row>
      <Row gutter={[24, 16]} className='dashboard-info'>
        <Col xs={24} xl={18}>
          <div className="section">
            <div className="section-header">
              <p className='dashboard__title'>{t('dashboard.title')}</p>
              <div className="divider"></div>
              <div className="view-all-link">
                {/* Your "View All" link goes here */}
                <Link to={'./Ẩm thực'} className='no-underline'> Xem tất cả</Link>
              </div>
            </div>
            <InfoItem />
          </div>
        </Col>
        <Col xs={24} xl={6}>
          <p className='dashboard__title'>{t('dashboard.titleHot')} </p>
          <BlogCarousel/>
        </Col>
      </Row>
      <Row gutter={[24, 16]} className='dashboard-info'>
        <Col xs={24} xl={18}>
          <div className="section">
            <div className="section-header">
              <p className='dashboard__title'>{t('dashboard.titleThethao')}</p>
              <div className="divider"></div>
              <div className="view-all-link">
                {/* Your "View All" link goes here */}
                <Link to={'./Thể thao'} className='no-underline'> Xem tất cả</Link>
              </div>
            </div>
            <Thethao />
          </div>
          <div className="section">
            <div className="section-header">
              <p className='dashboard__title'>{t('dashboard.titleGiaitri')}</p>
              <div className="divider"></div>
              <div className="view-all-link">
                {/* Your "View All" link goes here */}
                <Link to={'./Giải trí'} className='no-underline'> Xem tất cả</Link>
              </div>
            </div>
            <Giaitri />
          </div>
          <div className="section">
            <div className="section-header">
              <p className='dashboard__title'>{t('dashboard.titleCongnghe')}</p>
              <div className="divider"></div>
              <div className="view-all-link">
                {/* Your "View All" link goes here */}
                <Link to={'./Công nghệ'} className='no-underline'> Xem tất cả</Link>
              </div>
            </div>
            <Congnghe />
          </div>
          <div className="section">
            <div className="section-header">
              <p className='dashboard__title'>{t('dashboard.titleAmthuc')}</p>
              <div className="divider"></div>
              <div className="view-all-link">
                {/* Your "View All" link goes here */}
                <Link to={'./Ẩm thực'} className='no-underline'> Xem tất cả</Link>
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
