import axios from 'axios'
import { useContext, useEffect, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Button, Container, Stack, Typography, Box, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// components
import Iconify from '../../components/iconify';
import BlogPostsSearch from './BlogPostsSearch'
import BlogPostCard from './BlogPostCard'
import BlogPostsSort from './BlogPostsSort'
// mock
import { AppContext } from '../../context/AppContext'

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const { update } = useContext(AppContext);
  const navigate = useNavigate();
  const [posts , setPosts] = useState([])
  const [hover, setHover] = useState(false);

  useEffect(()=>{
    axios.get("http://localhost:8000/basic/api/news/").then((res) => {
      setPosts(res.data)
    })  
  },[update])

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <>
      <Helmet>
        <title> Blog | One Market </title>
      </Helmet>

      <Container>
        <Box pt={3} pb={3} ml={"-7%"} mt={"-2.5%"} mb={{xs:"0%",md:"-31%"}} mr={"-7%"}>
          <img style={{ width: "100%", height: "100%" }} src={'https://www.domuz.com.co/wp-content/uploads/2022/12/Untitled-design.png'} alt="React Logo" />
        </Box>
        <Typography variant="h1" pr={{xs:"0%",md:"45%"}}>
          The best prices on the market
        </Typography>
        <Typography pr={{xs:"0%",md:"45%"}} pb={{xs:"0%",md:"2%"}}>
        Step into style with our unbeatable selection of shoes! From the streets to the office, our shoes are the perfect fit for any occasion!
        </Typography>
        <Button      
          fullWidth 
          style={{
            transition: 'transform 0.2s',
            transform: hover ? 'scale(1.2)' : 'none',
            backgroundColor : "transparent",
            color: "#ffffff",        
            fontSize: "21px",
            display: "flex",
            flexDirection: "column"
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={()=>navigate('/login')}
        >
          See all products!
          <ExpandMoreIcon />
          
        </Button>
        <Box pb={{xs:"0%",md:"13%"}}/>
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={3}>
          <img src={'https://www.domuz.com.co/wp-content/uploads/2022/12/ONE-MARKET-4.png'} alt="React Logo" />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography pt={2} pb={2} align="justify">
            Are you ready to elevate your shoe game? Look no further than our collection of fashionable and comfortable footwear. We offer a variety of styles to choose from, so you can find the perfect pair to suit your personal style. From the office to a night out on the town, our shoes are the perfect addition to any outfit. Don't miss out on the opportunity to upgrade your shoe collection. Shop now and step up your style!            
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2} p={3}>
              <Button variant="contained" sx={{backgroundColor: "#4267B2",}}>
                <FacebookIcon />
              </Button>
              <Button variant="contained" sx={{backgroundColor: "#1DA1F2",}}>
                <TwitterIcon />
              </Button>
              <Button variant="contained" sx={{backgroundColor: "#FF0000",}}>
                <YouTubeIcon />
              </Button>
            </Stack>            
          </Grid>
        </Grid>
        <Typography variant="h3" align="center" sx={{ mb: 2 }}>
          All products
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={()=>navigate('/dashboard/create_post')}>
            New Post
          </Button>
        

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={posts} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} showButtons/>
          ))}
        </Grid>
      </Container>
    </>
  );
}
