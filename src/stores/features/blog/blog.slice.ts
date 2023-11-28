import HttpService from '~/config/api.ts'

export const getListBlog = async () => {
  try {
    return await HttpService.get('/blog/getall')
  } catch (e) {
    console.log(e)
  }
}

export const getBlogById = async (id: any) => {
  try {
    return await HttpService.get(`/blog/account/${id}`)
  } catch (e) {
    console.log(e)
  }
}

export const searchBlog = async (title: string) => {
  try {
    return await HttpService.get(`/blog/title/${title}`)
  } catch (e) {
    console.log(e)
  }
}
export const getBlogByAccount = async (id: number) => {
  try {
    return await HttpService.get(`/blog/myblog/${id}`)
  } catch (e) {
    console.log(e)
  }
}
export const getNewBlog = async () => {
  try {
    return await HttpService.get('/blog/getNewBlog')
  } catch (e) {
    console.log(e)
  }
}

export const getListTagAmthuc = async () => {
  try {
    return await HttpService.get('/blog/tags/Ẩm thực')
  } catch (e) {
    console.log(e)
  }
}
export const getListTagGiaitri = async () => {
  try {
    return await HttpService.get('/blog/tags/Giải trí')
  } catch (e) {
    console.log(e)
  }
}
export const getListTagThethao = async () => {
  try {
    return await HttpService.get('/blog/tags/Thể Thao')
  } catch (e) {
    console.log(e)
  }
}
export const getListTagCongnghe = async () => {
  try {
    return await HttpService.get('/blog/tags/Công nghệ')
  } catch (e) {
    console.log(e)
  }
}
export const GetBlogById = async (id: any) => {
  try {
    return await HttpService.get(`/blog/find/${id}`)
  } catch (e) {
    console.log(e)
  }
}
export const GetTag = async () => {
  try {
    return await HttpService.get('/tag/getall')
  } catch (e) {
    console.log(e)
  }
}

export const GetPermissions = async () => {
  try {
    return await HttpService.get('/permissions/getall')
  } catch (e) {
    console.log(e)
  }
}

export const deleteBlog = async (id: number) => {
  try {
    return await HttpService.get(`/blog/delete/${id}`)
  } catch (e) {
    console.log(e)
  }
}

export const AddBlog = async (payload: any) => {
  try {
    return await HttpService.post('/blog/add', payload)
  } catch (e) {
    console.log(e)
  }
}

export const UpdateBlog = async (id: any, payload: any) => {
  try {
    const response = await HttpService.post(`/blog/update/${id}`, payload)
    return response.data // Assuming the response contains the updated blog post
  } catch (error) {
    console.error('Error updating blog:', error)
    throw error // Propagate the error for handling in the calling code
  }
}
