import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { GetTag, AddBlog, GetPermissions } from '~/stores/features/blog/blog.slice.ts'
import { useEffect, useState } from 'react'
import { Flex, Input, Button, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './Style.css'

interface Tag {
  id: number
  name: string
}
interface Permissions{
  id: number
  name: string
}
const CreateBlog = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [image, setImage] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const { TextArea } = Input;
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([])
  const [permissions, setPermissions] = useState<Permissions[]>([])

  const { Option } = Select
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null)
  const [selectedPermissionsId, setSelectedPermissionsId] = useState<number | null>(null)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function uploadAdapter(loader) {
    return {
      upload: async () => {
        try {
          const file = await loader.file

          const reader = new FileReader()
          reader.onloadend = () => {
            const base64Data = reader.result
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setImage(base64Data)
            loader.imageData = base64Data
            return new Promise((resolve) => {
              resolve({ default: base64Data })
            });
          };
          reader.readAsDataURL(file)
          console.log(imageUrl)
          return new Promise((resolve) => {
            resolve({ default: image })
          });
        } catch (error) {
          console.error('Error uploading image:', error)
          throw error
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      abort: () => {}
    }
  }

  const [loadings, setLoadings] = useState<boolean[]>([])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function uploadPlugin(editor) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => uploadAdapter(loader)

  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0]

    setAvatar(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Data = reader.result;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAvatar(base64Data)
    };
    reader.readAsDataURL(file)
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleEditorChange = (event, editor) => {

    setContent(editor.getData())
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleTagChange = (value) => {
    setSelectedTagId(value)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handlePermissionsChange = (value) => {
    setSelectedPermissionsId(value)
  }
  const saveBlog = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);

    try {
      const payload = {
        title: title,
        image: image,
        avatar: avatar,
        content: content,
        description: description,
        tag: { id: selectedTagId },
        permissions: { id: selectedPermissionsId}
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const response = await AddBlog(payload);

      console.log(response)

      // console.log(response.iamge);
      navigate('../');

    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsResponse = await GetTag()
        const permissionsResponse = await GetPermissions()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fetchedTags: axios.AxiosResponse<any> | any[] = tagsResponse || []
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fetchedPermissions: axios.AxiosResponse<any> | any[] = permissionsResponse || []
        setTags(fetchedTags)
        setPermissions(fetchedPermissions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='App'>
      <input type='file' accept='image/*' onChange={handleAvatarUpload} />
      {avatar && <img src={avatar} alt='Avatar' style={{ width: '100px' }} />}
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
        <Select placeholder='Chọn permissions' onChange={handlePermissionsChange} style={{ width: '100%' }} value={selectedPermissionsId}>
          {permissions.map((permission) => (
            <Option key={permission.id} value={permission.id}>
              {permission.name}
            </Option>
          ))}
        </Select>
      </Flex>
      <br />
      <CKEditor
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        config={{
          extraPlugins: [uploadPlugin],

        }}

        editor={ClassicEditor}
        onChange={handleEditorChange}
        data={content}
      />
      <Button style={{ width: '100%', height: 40 }} type='primary' loading={loadings[1]} onClick={() => saveBlog(1)}>
        Tạo bài viết
      </Button>
    </div>
  )
}

export default CreateBlog
