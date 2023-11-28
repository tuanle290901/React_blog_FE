import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import { getListBlog, getNewBlog } from '~/stores/features/blog/blog.slice.ts'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export interface Blog {
  id: number
  avatar: string
  timeCreate: string
  title: string
  description: string
  image: string
}

const InfoItem: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { blog } = useParams()
  const { Meta } = Card

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await getNewBlog()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fetchedBlogs: axios.AxiosResponse<any> | any[] = blogsResponse || []
        console.log('blogshaha', fetchedBlogs)
        setBlogs(fetchedBlogs)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [blog])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const truncateText = (text, limit) => {
    const words = text.split(' ')
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text
  }
  return (
    <div>
      <Row gutter={[16, 16]} justify='center'>
        {blogs.slice(0, 8).map((blog) => (
          <Col key={blog.id} xs={24} sm={12} md={16} lg={12} xl={6}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
              <Card hoverable style={{ width: '100%', height: 350 }} cover={<img alt='example' src={blog.avatar} />}>
                <Meta title={blog.title} description={truncateText(blog.description, 20)} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default InfoItem
