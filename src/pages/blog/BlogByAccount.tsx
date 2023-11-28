import React, { useEffect, useState } from 'react'
import { deleteBlog, getBlogById } from '~/stores/features/blog/blog.slice.ts'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { Table, Modal } from 'react-bootstrap'
import { Button } from 'antd'
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
  permissions:{
    id:number
    name:string
  }
}

const AmthucDetail: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { id } = useParams()
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);

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
    setBlogToDelete(blogId);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Dispatch the deleteBlog action with the blogId
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await dispatch(deleteBlog(blogToDelete));

      // Update the UI by removing the deleted blog from the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete));
      closeModal()
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      // Reset state and close the modal
      setBlogToDelete(null);
      setConfirmDelete(false);
    }
    window.location.reload()
  };
  const closeModal = () => {
    setBlogToDelete(null);
    setConfirmDelete(false);
  };

  const handleCloseModal = () => {
    // Reset state if the user cancels the deletion
    setBlogToDelete(null);
    setConfirmDelete(false);
  };

  const truncateText = (text: string, limit: number) => {
    const words = text.split(' ')
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>id</th>
          <th>Ảnh</th>
          <th>Ảnh đại diện</th>
          <th>Tiêu đề</th>
          <th>Nội dung</th>
          <th>Miêu tả</th>
          <th>Quyền</th>
          <th colSpan={3} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Quản lý</th>
        </tr>
        </thead>
        <tbody>
        {blogs.map((blog, index) => (
          <tr key={index}>
            <td>{blog.id}</td>
            <td style={{ width: 150 }}>
              <img src={blog.image} alt='img' style={{ width: 80, height: '30%' }} />
            </td>
            <td style={{ width: 150 }}>
              <img src={blog.avatar} alt='img' style={{ width: 80, height: '30%' }} />
            </td>
            <td>{truncateText(blog.title, 5)}</td>
            <td>{truncateText(blog.content, 5)}</td>
            <td>{truncateText(blog.description, 5)}</td>
            <td>{truncateText(blog.permissions.name, 5)}</td>
            <td>
              <Button type='primary'>Sửa</Button>
            </td>
            <td>
             <Link to={`blog/${blog.id}`} >
               <Button type='primary'>Xem bài viết</Button>
             </Link>
            </td>
            <td>
              <Button type='primary' onClick={() => handleDelete(blog.id)}>
                Xoá
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>

      <Modal show={confirmDelete} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa blog này không?        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default AmthucDetail;
