import { useEffect } from 'react'
import { getListBlog } from '~/stores/features/blog/blog.slice.ts'

const Index = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListBlog();
        console.log(response, 'ssss');
      } catch (e) {
        console.log(e);
      }
    };

    fetchData(); // Call the async function immediately

  }, []);

  return <div>My blog</div>
}

export  default Index