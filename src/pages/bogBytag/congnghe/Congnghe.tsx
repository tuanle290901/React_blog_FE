import React, { useEffect, useState } from 'react'
import { getListBlog, getListTagAmthuc, getListTagCongnghe } from '~/stores/features/blog/blog.slice.ts'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Row } from 'antd'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';

import './Swiper.css'
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'


interface Blog {
  id: number;
  avatar: string;
  timeCreate: string;
  title: string;
  description: string;
  image:string
}


const Congnghe: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { blog } = useParams();
  const { Meta } = Card;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await getListTagCongnghe();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fetchedBlogs: axios.AxiosResponse<any> | any[] = blogsResponse || [];
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [blog]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const truncateText = (text, limit) => {
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  };
  return (
    <div>
      <Row gutter={[16, 16]} justify="center">
        {blogs.slice(0, 4).map((blog) => (
          <Col key={blog.id} xs={24} sm={12} md={16} lg={12} xl={6}>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
              <Card hoverable style={{ width: '100%' }} cover={<img alt='example' src={blog.avatar} />}>
                <Meta title={blog.title} description={truncateText(blog.description, 20)} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Congnghe;