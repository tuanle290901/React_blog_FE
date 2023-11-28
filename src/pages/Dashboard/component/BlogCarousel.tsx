import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import './style.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Row } from 'antd'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from 'axios/index'
import { getListBlog, getNewBlog } from '../../../stores/features/blog/blog.slice'

interface Blog {
  id: number
  avatar: string
  timeCreate: string
  title: string
  description: string
  image: string
}

export default function App() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { blog } = useParams()
  const { Meta } = Card

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await getListBlog()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fetchedBlogs: axios.AxiosResponse<any> | any[] = blogsResponse || []
        setBlogs(fetchedBlogs)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [blog])
  return (
    <>
      <Swiper rewind={true} navigation={true} modules={[Navigation]} className='mySwiper'>
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={<img alt='example' src={blog.avatar} style={{ height: '60%' }} />}
              >
                <Meta title={blog.title} />
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
