import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Row, Select, notification } from 'antd'
import './style.scss'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '~/stores/hook'
import { LocalStorage } from '~/utils/local-storage'
import { IUser } from '~/types/user.interface'
import Amthuc from '~/pages/bogBytag/amthuc/Amthuc.tsx'
import AmthucDetail from '~/pages/bogBytag/amthuc/AmthucDetail.tsx'
// import BlogDetail from '~/pages/Dashboard/component/BlogDetail.tsx'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const currentAuth: IUser | null = LocalStorage.getObject('currentAuth')
  const userGroup = currentAuth?.groupProfiles[0]?.groupCode
  const groupsSate = useAppSelector((state) => state.masterData.groups)
  const [selectedGroup, setSelectedGroup] = useState(userGroup)


  return (
    <div className='dashboard'>
      <p className='dashboard__title'>{t('dashboard.titleAmthuc')}</p>
      <Row gutter={[24, 16]} className='dashboard-filter'>
      </Row>
      <Row gutter={[24, 16]} className='dashboard-info'style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Col xs={15} xl={25} lg={18} >
          <AmthucDetail/>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
