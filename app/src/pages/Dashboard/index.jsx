import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import AppWebsiteVisits from './AppWebsiteVisits';
import AppWidgetSummary from './AppWidgetSummary';
import AppConversionRates from './AppConversionRates';
import AppCurrentVisits from './AppCurrentVisits';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const VISITS_MOCK = [
    {
      date: '01/01/2023',
      visits: 100,
      redirects: 10,
    },
    {
      date: '01/02/2023',
      visits: 120,
      redirects: 15,
    },
    {
      date: '01/03/2023',
      visits: 90,
      redirects: 12,
    },
    {
      date: '01/04/2023',
      visits: 110,
      redirects: 18,
    },
    {
      date: '01/05/2023',
      visits: 95,
      redirects: 11,
    },
    {
      date: '01/06/2023',
      visits: 130,
      redirects: 20,
    },
  ];
  const STORES = [
    {
      store: 'Nike',
      visits: 540,
    },
    {
      store: 'Adidas',
      visits: 480,
    },
    {
      store: 'Puma',
      visits: 420,
    },
    {
      store: 'Reebok',
      visits: 380,
    },
    {
      store: 'New Balance',
      visits: 340,
    },
    {
      store: 'Under Armour',
      visits: 300,
    },
  ];

  /* const MOST_CLICKED = [
    { product: 'Outdoor shoes', redirects: 1380 },
    { product: 'Athletic shoes', redirects: 1200 },
    { product: 'Dress shoes', redirects: 1100 },
    { product: 'Running shoes', redirects: 690 },
    { product: 'Flip flops', redirects: 580 },
    { product: 'High heels', redirects: 540 },
    { product: 'Boots', redirects: 470 },
    { product: 'Sandals', redirects: 448 },
    { product: 'Loafers', redirects: 430 },
    { product: 'Sneakers', redirects: 400 },
  ]; */
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [todayRedirects, setTodayRedirects] = useState(0);
  const [monthRedirects, setMonthRedirects] = useState([]);
  const [visitedStores, setVisitedStores] = useState([]);
  const [mostClicked, setMostClicked] = useState([]);
  const [updateDash, setUpdateDash] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/getUsersNumber/`).then((res) => {
      setTotalUsers(res.data);
    });
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/getProductsNumber/`).then((res) => {
      setTotalProducts(res.data);
    });
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/sumTodayVisits/`).then((res) => {
      setTodayViews(res.data);
    });
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/sumTodayRedirects/`).then((res) => {
      setTodayRedirects(res.data);
    });
    /* TODO monthRedirects */
    setMonthRedirects(VISITS_MOCK);
    /* TODO setVisitedStores */
    setVisitedStores(STORES);
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/sortByRedirects/`).then((res) => {
      setMostClicked(res.data);
    });
  }, [updateDash]);
  return (
    <>
      <Helmet>
        <title> Dashboard | One Market </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Users" total={totalUsers} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Products"
              total={totalProducts}
              color="info"
              icon={'ant-design:appstore-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Today Views"
              total={todayViews}
              color="warning"
              icon={'ant-design:fund-view-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Today Redirects"
              total={todayRedirects}
              color="error"
              icon={'ant-design:link-outlined'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Product Visits and redirects"
              subheader="For all products"
              chartLabels={monthRedirects.map((data) => data.date)}
              chartData={[
                {
                  name: 'Views',
                  type: 'line',
                  fill: 'solid',
                  data: monthRedirects.map((data) => data.visits),
                },
                {
                  name: 'Redirects',
                  type: 'area',
                  fill: 'gradient',
                  data: monthRedirects.map((data) => data.redirects),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Most visited stores"
              chartData={[...visitedStores.map((store) => ({ label: store.store, value: store.visits }))]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              title="Most clicked products"
              subheader="On all the store"
              chartData={[...mostClicked.map((item) => ({ label: [item[0], item[2]].join(', '), value: item[1] }))]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
