import { Button, Result } from 'antd'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  return (
    <Result
      status='404'
      title='404'
      subTitle='Đường dẫn không tồn tại'
      extra={
        <Button
          type='primary'
          onClick={() => {
            navigate(`/`)
          }}
        >
          Quay lại
        </Button>
      }
    />
  )
}

export default memo(Index)
