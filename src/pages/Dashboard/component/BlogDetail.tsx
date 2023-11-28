// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Spin, Layout, Card, Row, Col } from 'antd'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GetBlogById } from '~/stores/features/blog/blog.slice.ts'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import backgrounddd from '~/assets/images/hero_1.jpg'
import { getBlogByAccount } from '../../../stores/features/blog/blog.slice'
import axios from 'axios/index'

const { Header, Footer, Sider, Content } = Layout

// Define the shape of a blog post
interface Blog {
  id: number
  likes: number
  avatar: string
  timeCreate: string
  title: string
  description: string
  image: string
  content: string
  tag: {
    id: number
    name: string
  }
  account: {
    id: number
    img: string
    name: string
  }
}

// Define the shape of a blog post by account
interface BlogByAccount {
  id: number
  avatar: string
  timeCreate: string
  title: string
  description: string
  image: string
  content: string
  tag: {
    id: number
    name: string
  }
  account: {
    id: number
    img: string
    name: string
  }
}

const BlogDetail: React.FC = () => {
  const { id } = useParams()
  const [blogDetail, setBlogDetail] = useState<Blog | null>(null)
  const [blogByAccount, setBlogByAccount] = useState<BlogByAccount[]>([])
  const [loading, setLoading] = useState(true)
  const { Meta } = Card

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        // Fetch the main blog details
        const response = await GetBlogById(id)

        // Fetch blogs by the same account
        const blogAccountResponse = await getBlogByAccount(response.account.id)
        const fetchedBlogs: BlogByAccount[] = blogAccountResponse || []
        console.log(blogAccountResponse, 'acc')

        // Set state with fetched data
        setBlogByAccount(fetchedBlogs)
        setBlogDetail(response)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching blog detail:', error)
        setLoading(false)
      }
    }

    // Call the fetchBlogDetail function
    fetchBlogDetail()
  }, [id])

  // Function to truncate text based on a character limit
  const truncateText = (text: string, limit: number) => {
    const words = text.split(' ')
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text
  }

  // Render the component
  return (
    <div className='blog-detail'>
      <Layout>
        <Header style={{ width: '100%', height: '200px', background: 'white' }}>
          <div
            className='site-cover site-cover-sm same-height overlay single-page'
            style={{ backgroundImage: `url(${backgrounddd})` }}
          >
            <div className='container'>
              <div className='row same-height justify-content-center'>
                <div className='col-md-6'>
                  {blogDetail && (
                    <div className='post-entry text-center'>
                      <h2 style={{ textTransform: 'uppercase', fontSize: '24px', fontWeight: 'bold' }}>
                        {blogDetail.title}
                      </h2>
                      <div className='post-meta align-items-center text-center'>
                        <figure className='author-figure mb-0 me-3 d-inline-block rounded-circle overflow-visible'>
                          <img
                            src={blogDetail.account.img}
                            alt=''
                            className='img-fluid rounded-circle'
                            style={{ width: '50px', height: '50px' }}
                          />
                        </figure>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          {/* <Sider style={{ background: 'white' }}></Sider> */}
          <div>
            {loading ? (
              <Spin />
            ) : (
              blogDetail && (
                <Row
                  gutter={[24, 16]}
                  className='blog-detail-content'
                  style={{ lineHeight: '1.8', marginBottom: '20px' }}
                  align={'center'}
                >
                  <Col span={16}>
                    <div className='tw-p-4'>
                      <div style={{ fontSize: 'medium', fontStyle: 'italic', marginBottom: '10px' }}>
                        {blogDetail.description}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blogDetail.content.replace(
                            '<img>',
                            `<img style='display: block; margin: 0 auto;width: 80%' src='${blogDetail.image}' alt='${blogDetail.title}'>`
                          )
                        }}
                        style={{ fontFamily: 'sans-serif', fontSize: 'medium' }}
                      />
                      <div className='pt-5'>
                        <p style={{ marginBottom: '10px' }}>
                          Tác giả: {blogDetail.account.name} -{' '}
                          {new Date(blogDetail.timeCreate).toLocaleDateString('vi-VN')}
                          <br />
                          Danh mục:{' '}
                          <Link to={`../${blogDetail.tag.name}`} className='no-underline'>
                            {blogDetail.tag.name}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              )
            )}
          </div>

          {/* <Sider style={{ background: 'white' }}></Sider> */}
        </Layout>
        <div className='tw-bg-white tw-mt-[20px]'>
          <Row gutter={[24, 16]} className='dashboard-info'>
            <Col span={16} offset={4}>
              <div className='section'>
                <div className='section-header'>
                  {/* Section header with title, divider, and "View All" link */}
                  <p className='dashboard__title'>Bài viết cùng tác giả</p>
                  <div className='divider'></div>
                </div>
                {/* Render blogs by the same account */}
                <div>
                  <Row gutter={[16, 16]} justify='center'>
                    {blogByAccount.slice(0, 4).map((blogByAccounts) => (
                      <Col key={blogByAccounts.id} xs={24} sm={12} md={16} lg={12} xl={6}>
                        <Link to={`/blog/${blogByAccounts.id}`} style={{ textDecoration: 'none' }}>
                          <Card
                            hoverable
                            style={{ width: '100%' }}
                            cover={<img alt='example' src={blogByAccounts.avatar} />}
                          >
                            <Meta
                              title={blogByAccounts.title}
                              description={truncateText(blogByAccounts.description, 20)}
                            />
                          </Card>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    </div>
  )
}

export default BlogDetail
