import { IRoutes } from '~/constants/public-routes.tsx'

import { ROLE } from '~/constants/app.constant.ts'
import Dashboard from '~/pages/Dashboard'
import Test from '~/pages/Test'
import Blog from '~/pages/blog'
// eslint-disable-next-line import/namespace,import/default,import/no-named-as-default
import CreateBlog from '~/pages/blog/Create.tsx'
import TagAmthuc from '~/pages/bogBytag/amthuc/TagAmthuc.tsx'
import TagCongnghe from '~/pages/bogBytag/congnghe/TagCongnghe.tsx'
import BlogDetail from '~/pages/Dashboard/component/BlogDetail.tsx'
import TagGiaitri from '~/pages/bogBytag/giaitri/TagGiaitri.tsx'
import TagThethao from '~/pages/bogBytag/thethao/TagThethao.tsx'
import BlogByAccount from '~/pages/blog/BlogByAccount.tsx'
import SearchDerail from '~/pages/blog/SearchDetail.tsx'
import EditBlog from '~/pages/blog/Updatelog'
export const PRIVATE_PATH = {
  home: '/',
  user: {
    prefix: '/users',
    create: '/user/create',
    update: 'user/update',
    detail: 'user/detail',
    history: 'user/history/:id'
  },
  timesheet: '/timesheet',
  dashboard: '/dashboard',
  setting: {
    ticketProcessDefinition: 'ticket-process-definition',
    ticketProcessDefinitionNew: 'ticket-definition',
    ticketDefinitionById: 'ticket-definition/:id',
    ticketDefinitionCreate: 'ticket-definition/create-revison/:ticketType',
    ticketDefinitionView: 'ticket-definition/view-revison/:ticketType/:rev'
  },
  department: {
    prefix: 'department'
  },
  devices: '/devices',
  config: {
    prefix: '/working-time',
    holidaySchedule: '/holiday-schedule',
    benefit: '/benefit'
  },
  timeManagement: {
    prefix: '/work-time',
    requests: '/work-time/requests'
  },
  position: '/positions',
  typesOfleave: '/types-of-leave',
  report: 'report',
  leaveRequest: '/request',
  requestDetail: '/request/:code',
  statistical: 'statistical'
}

export const PRIVATE_ROUTES: IRoutes[] = [
  {
    name: 'home',
    path: '',
    component: Dashboard,
    allowedRoles: []
  },
  {
    name: 'test',
    path: 'test',
    component: Test,
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: 'Blogdetail',
    path: 'blog/:id',
    component: BlogDetail,
    allowedRoles: []
  },
  {
    name: 'Search',
    path: 'Search/:query',
    component: SearchDerail,
    allowedRoles: []
  },
  {
    name: 'BlogByAccount',
    path: 'BlogByAccount/:id',
    component: BlogByAccount,
    allowedRoles: []
  },
  {
    name: 'UpdateBlog',
    path: 'blogUpdate/:id',
    component: CreateBlog,
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: 'blog',
    path: 'blog',
    component: Blog,
    allowedRoles: []
  },
  {
    name: 'Blog-Ẩm-Thực',
    path: 'Ẩm thực',
    component: TagAmthuc,
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: 'Blog-Công-Nghệ',
    path: 'Công nghệ',
    component: TagCongnghe,
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: 'Blog-Giải-Trí',
    path: 'Giải trí',
    component: TagGiaitri,
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: 'Blog-Thể-Thao',
    path: 'Thể thao',
    component: TagThethao,
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
  },
  {
    name: 'create',
    path: 'create',
    component: CreateBlog,
    allowedRoles: [ROLE.ADMIN, ROLE.USER]
  }
]
