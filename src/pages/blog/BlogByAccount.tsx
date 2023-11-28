import React, { useEffect, useState } from 'react'
import { deleteBlog, getBlogById } from '~/stores/features/blog/blog.slice.ts'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { Modal } from 'react-bootstrap'
import { Button, Space, Table } from 'antd'
import { useDispatch } from 'react-redux'
import axios from 'axios'

interface Blog {
  id: number
  avatar: string
  timeCreate: string
  title: string
  description: string
  image: string
  content: string
  permissions: {
    id: number
    name: string
  }
}

const AmthucDetail: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { id } = useParams()
  const navigate = useNavigate() // Use useNavigate instead of useHistory

  const dispatch = useDispatch()
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: any, record: any) => <img src={record.image} alt='img' style={{ width: 80, height: '30%' }} />
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: any, record: any) => <img src={record.avatar} alt='img' style={{ width: 80, height: '30%' }} />
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: any, record: any) => truncateText(record.title, 5)
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (text: any, record: any) => truncateText(record.content, 5)
    },
    {
      title: 'Miêu tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: any, record: any) => truncateText(record.description, 5)
    },
    {
      title: 'Quyền',
      dataIndex: ['permissions', 'name'],
      key: 'permissions',
      render: (text: any, record: any) => truncateText(record.permissions.name, 5)
    },
    {
      title: 'Quản lý',
      key: 'action',
      render: (text: any, record: any) => (
        <Space>
          <Button onClick={() => navigate(`/blogUpdate/${record.id}`)} type='primary'>
            Sửa
          </Button>
          <Button onClick={() => navigate(`/blog/${record.id}`)} type='primary'>
            Xem bài viết
          </Button>
          <Button type='primary' onClick={() => handleDelete(record.id)}>
            Xoá
          </Button>
        </Space>
      )
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await getBlogById(id)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fetchedBlogs: axios.AxiosResponse<any> | any[] = blogsResponse || []
        setBlogs(fetchedBlogs)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  const handleDelete = (blogId: number) => {
    setBlogToDelete(blogId)
    setConfirmDelete(true)
  }

  const handleConfirmDelete = async () => {
    try {
      // Dispatch the deleteBlog action with the blogId
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await dispatch(deleteBlog(blogToDelete))

      // Update the UI by removing the deleted blog from the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete))
      closeModal()
    } catch (error) {
      console.error('Error deleting blog:', error)
    } finally {
      // Reset state and close the modal
      setBlogToDelete(null)
      setConfirmDelete(false)
    }
    window.location.reload()
  }
  const closeModal = () => {
    setBlogToDelete(null)
    setConfirmDelete(false)
  }

  const handleCloseModal = () => {
    // Reset state if the user cancels the deletion
    setBlogToDelete(null)
    setConfirmDelete(false)
  }

  const truncateText = (text: string, limit: number) => {
    const words = text.split(' ')
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text
  }

  return (
    <div className='tw-mt-1 tw-p-[30px]'>
      <h2 className='tw-mb-3 tw-font-semibold tw-text-2xl'>Danh sách tất cả blog của tôi</h2>
      <Table dataSource={blogs} columns={columns} />

      <Modal show={confirmDelete} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa blog này không? </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Huỷ</Button>
          <Button onClick={handleConfirmDelete}>Xoá</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AmthucDetail
