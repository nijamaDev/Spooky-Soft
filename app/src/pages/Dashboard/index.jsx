import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// sections
import AppTasks from './AppTasks';
import AppNewsUpdate from './AppNewsUpdate';
import AppOrderTimeline from './AppOrderTimeline';
import AppWebsiteVisits from './AppWebsiteVisits';
import AppTrafficBySite from './AppTrafficBySite';
import AppWidgetSummary from './AppWidgetSummary';
import AppCurrentSubject from './AppCurrentSubject';
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
            <AppWidgetSummary title="Total Users" total={714000} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Products"
              total={1352831}
              color="info"
              icon={'ant-design:appstore-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Today Views"
              total={1723315}
              color="warning"
              icon={'ant-design:fund-view-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Today Redirects" total={234} color="error" icon={'ant-design:link-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Product Visits and redirects"
              subheader="For all products"
              chartLabels={VISITS_MOCK.map((data) => data.date)}
              chartData={[
                {
                  name: 'Views',
                  type: 'line',
                  fill: 'solid',
                  data: VISITS_MOCK.map((data) => data.visits),
                },
                {
                  name: 'Redirects',
                  type: 'area',
                  fill: 'gradient',
                  data: VISITS_MOCK.map((data) => data.redirects),
                },
                /* {
                  name: 'Conversion Rate',
                  type: 'column',
                  fill: 'solid',
                  data: [0.88, 0.85, 0.73, 0.84, 0.49, 0.66, 0.48, 0.66, 0.71, 0.75, 0.62],
                }, */
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Most visited stores"
              chartData={[
                { label: 'Naik', value: 4344 },
                { label: 'Ardidos', value: 5435 },
                { label: 'jomsenter', value: 1443 },
                { label: 'Calzzzatodo', value: 4443 },
              ]}
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
              chartData={[
                { label: 'Outdoor shoes', value: 1380 },
                { label: 'Athletic shoes', value: 1200 },
                { label: 'Dress shoes', value: 1100 },
                { label: 'Running shoes', value: 690 },
                { label: 'Flip flops', value: 580 },
                { label: 'High heels', value: 540 },
                { label: 'Boots', value: 470 },
                { label: 'Sandals', value: 448 },
                { label: 'Loafers', value: 430 },
                { label: 'Sneakers', value: 400 },
              ]}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
