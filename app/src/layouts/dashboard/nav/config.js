// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics.svg'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: icon('ic_user.svg'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog.svg'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_cart.svg'),
  },
  {
    title: 'scrapping',
    path: '/dashboard/scrapping',
    icon: icon('pickaxe.png'),
  },
];

export default navConfig;
