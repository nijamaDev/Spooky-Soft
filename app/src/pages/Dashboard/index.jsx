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
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalRedirects, setTotalRedirects] = useState(0);
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
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/alejo_lines/`).then((res) => {
      setMonthRedirects(res.data);
    });
    axios.get(`${process.env.REACT_APP_BACK_ADDRESS}/basic/api/alejo_report/`).then((res) => {
      setTotalViews(res.data.tv);
      setTotalRedirects(res.data.tr);
      setVisitedStores([
        {
          store: 'Falabella',
          visits: res.data.tfr,
        },
        {
          store: 'Croydon',
          visits: res.data.tcr,
        },
      ]);
    });
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
              title="Total Views"
              total={totalViews}
              color="warning"
              icon={'ant-design:fund-view-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Redirects"
              total={totalRedirects}
              color="error"
              icon={'ant-design:link-outlined'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Most visited stores"
              chartData={[...visitedStores.map((store) => ({ label: store.store, value: store.visits }))]}
              chartColors={[
                '#aad500',
                '#25388e',
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
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
