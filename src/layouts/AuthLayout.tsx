import { Outlet } from 'react-router-dom'
import bgLogin from '~/assets/images/login/bg-login.png'
import iconPlay from '~/assets/images/login/icon-play.png'

const AuthLayout: React.FC = () => {
  return (
    <div className='auth-container'>
      <div className='auth-inner-container tw-w-full tw-h-full'>
        <div className='auth-container__left tw-w-1/2 tw-hidden lg:tw-block'>
          <div className='inner-container'>
            <div className='tw-w-full tw-h-full tw-absolute login-background' />
            <div className='tw-w-full tw-h-full tw-absolute modal-inner md:tw-p-[10px] xl:tw-pl-[50px]'>
              <div className='tw-hidden xl:tw-block login-title-note tw-mt-[20px]'></div>
            </div>
          </div>
        </div>
        <div className='auth-container__right tw-w-full lg:tw-w-1/2'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
