import LoginComponent from '~/pages/login'
import { ROLE } from '~/constants/app.constant.ts'
import RegisterComponent from '~/pages/register/Register.tsx'

export interface IRoutes {
  path: string
  name: string
  component: any
  allowedRoles: ROLE[]
}

export const PUBLIC_PATH = {
  register: 'register',
  login: 'login',
  notfound: '404',
  unauthorized: 'unauthorized',
  initialize: 'initialize'
}

export const PUBLIC_ROUTES: IRoutes[] = [
  {
    name: 'register',
    path: PUBLIC_PATH.register,
    component: RegisterComponent,
    allowedRoles: []
  },
  {
    name: 'login',
    path: PUBLIC_PATH.login,
    component: LoginComponent,
    allowedRoles: []
  }
]
