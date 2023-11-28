import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Row, Select, notification } from 'antd'
import './style.scss'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '~/stores/hook'
import { LocalStorage } from '~/utils/local-storage'
import { IUser } from '~/types/user.interface'
import Amthuc from '~/pages/bogBytag/amthuc/Amthuc.tsx'
import Thethao from '~/pages/bogBytag/thethao/Thethao.tsx'
import ThethaoDetail from '~/pages/bogBytag/thethao/ThethaoDetail.tsx'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const currentAuth: IUser | null = LocalStorage.getObject('currentAuth')
  const userGroup = currentAuth?.groupProfiles[0]?.groupCode
  const groupsSate = useAppSelector((state) => state.masterData.groups)
  const [selectedGroup, setSelectedGroup] = useState(userGroup)


  return (
    <div className='dashboard'>
      <p className='dashboard__title'>{t('dashboard.titleThethao')}</p>
      <Row gutter={[24, 16]} className='dashboard-filter'>
      </Row>
      <Row gutter={[24, 16]} className='dashboard-info'style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Col xs={15} xl={25} lg={18} >
          <ThethaoDetail/>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
