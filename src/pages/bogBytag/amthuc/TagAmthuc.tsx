import React, { useEffect, useState } from 'react'
import { Button, Carousel, Col, DatePicker, Divider, Image, Row, Select, notification } from 'antd'
import './style.scss'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '~/stores/hook'
import { LocalStorage } from '~/utils/local-storage'
import { IUser } from '~/types/user.interface'
import Amthuc from '~/pages/bogBytag/amthuc/Amthuc.tsx'
import AmthucDetail from '~/pages/bogBytag/amthuc/AmthucDetail.tsx'
// import BlogDetail from '~/pages/Dashboard/component/BlogDetail.tsx'
import carousel1 from '~/assets/images/carousel1.jpg'
import carousel2 from '~/assets/images/carousel2.jpg'

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}
const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const currentAuth: IUser | null = LocalStorage.getObject('currentAuth')
  const userGroup = currentAuth?.groupProfiles[0]?.groupCode
  const groupsSate = useAppSelector((state) => state.masterData.groups)
  const [selectedGroup, setSelectedGroup] = useState(userGroup)

  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }

  return (
    <div className='dashboard'>
      <p className='dashboard__title'>{t('dashboard.titleAmthuc')}</p>
      <Row gutter={[24, 16]} className='dashboard-filter'></Row>

      <Row
        gutter={[24, 16]}
        className='dashboard-info'
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Col xs={15} xl={25} lg={18}>
          <AmthucDetail />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
