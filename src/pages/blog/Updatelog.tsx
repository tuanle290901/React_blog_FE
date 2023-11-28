import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { GetTag, GetBlogById, UpdateBlog, GetPermissions } from '~/stores/features/blog/blog.slice.ts'
import { useEffect, useState } from 'react'
import { Flex, Input, Button, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './Style.css'

interface Tag {
  id: number
  name: string
}

interface Permissions {
  id: number
  name: string
}

const EditBlog = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [image, setImage] = useState<any>('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const { TextArea } = Input
  const navigate = useNavigate()
  const [tags, setTags] = useState<Tag[]>([])
  const [permissions, setPermissions] = useState<Permissions[]>([])
  const { Option } = Select
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null)
  const [selectedPermissionsId, setSelectedPermissionsId] = useState<number | null>(null)

  const fetchData = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const blogResponse = await GetBlogById(id)
      const tagsResponse = await GetTag()
      const permissionsResponse = await GetPermissions()

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const fetchedBlog: any = blogResponse.data || {}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const fetchedTags: any[] = tagsResponse.data || []
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const fetchedPermissions: any[] = permissionsResponse.data || []

      setTitle(fetchedBlog.title)
      setDescription(fetchedBlog.description)
      setTag(fetchedBlog.tag)
      setAvatarUrl(fetchedBlog.avatarUrl)
      setImageUrl(fetchedBlog.imageUrl)
      setSelectedTagId(fetchedBlog.tag.id)
      setSelectedPermissionsId(fetchedBlog.permissions.id)
      setContent(fetchedBlog.content)

      setTags(fetchedTags)
      setPermissions(fetchedPermissions)
      setLoading(false) // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  function uploadAdapter(loader: any) {
    return {
      upload: async () => {
        try {
          const file = await loader.file
          const reader = new FileReader()

          reader.onloadend = () => {
            const base64Data = reader.result
            setImage(base64Data)
            loader.imageData = base64Data
          }

          reader.readAsDataURL(file)

          return new Promise((resolve) => {
            resolve({ default: image })
          })
        } catch (error) {
          console.error('Error uploading image:', error)
          throw error
        }
      },
      abort: () => {
        // TODO
      }
    }
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => uploadAdapter(loader)
  }
  const handleAvatarUpload = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader: any = new FileReader()
      reader.onloadend = () => {
        setAvatar(file)

        setAvatarUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditorChange = (event: any, editor: any) => {
    setContent(editor.getData())
  }

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value)
  }
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value)
  }

  const handleTagChange = (value: any) => {
    setSelectedTagId(value)
  }

  const handlePermissionsChange = (value: any) => {
    setSelectedPermissionsId(value)
  }

  const updateBlog1 = async () => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('image', image || avatar) // Use the selected image or the uploaded avatar
      formData.append('content', content)
      formData.append('description', description)
      if (selectedTagId) {
        formData.append('tag', selectedTagId.toString())
      }

      if (selectedPermissionsId) {
        formData.append('permissions', selectedPermissionsId.toString())
      }
      if (id) {
        await UpdateBlog(id, formData)
      }

      navigate('../')
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='App'>
      <input type='file' accept='image/*' onChange={handleAvatarUpload} />
      {avatarUrl && <img src={avatarUrl} alt='Avatar' style={{ width: '100px' }} />}
      <Flex vertical gap={32}>
        <Input showCount maxLength={100} onChange={handleTitleChange} placeholder='Nhập Title' value={title} />
        <TextArea
          showCount
          maxLength={200}
          onChange={handleDescriptionChange}
          placeholder='Nhập Description'
          value={description}
        />
        <Select placeholder='Chọn Tag' onChange={handleTagChange} style={{ width: '100%' }} value={selectedTagId}>
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder='Chọn permissions'
          onChange={handlePermissionsChange}
          style={{ width: '100%' }}
          value={selectedPermissionsId}
        >
          {permissions.map((permission) => (
            <Option key={permission.id} value={permission.id}>
              {permission.name}
            </Option>
          ))}
        </Select>
      </Flex>
      <br />
      <CKEditor
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config={{
          extraPlugins: [uploadPlugin]
        }}
        editor={ClassicEditor}
        onChange={handleEditorChange}
        data={content}
      />
      <Button style={{ width: '100%', height: 40 }} type='primary' onClick={updateBlog1}>
        Update Blog
      </Button>
    </div>
  )
}

export default EditBlog
