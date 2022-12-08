import axios from 'axios'
import { useEffect, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import BlogPostsSearch from './BlogPostsSearch'
import BlogPostCard from './BlogPostCard'
import BlogPostsSort from './BlogPostsSort'
// mock


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const navigate = useNavigate();
  const [posts , setPosts] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:8000/basic/api/news/").then((res) => {
      console.log(res.data)
      setPosts(res.data)
    })  
  },[])

  return (
    <>
      <Helmet>
        <title> Blog | One Market </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={12}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={()=>navigate('/dashboard/create_post')}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={posts} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
