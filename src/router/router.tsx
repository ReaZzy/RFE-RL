import { CircularProgress } from '@mui/material';
import DefaultLayout from '@src/layouts/defaultLayout/Default.layout';
import IndexPage from '@src/pages';
import { createReactRouter, createRouteConfig } from '@tanstack/react-router';

/*
 * @description (review) Here I use @tanstack/react-router instead of the usual
 * react-routed-dom. There were a couple of different reasons
 * such as 100% typescript support and trying something new in general
 * (I think test tasks are one of the best places to try new technologies).
 * I know that we also can don't use the router library at all, but I think
 * that we should follow the normal architecture even in such a small tasks
 * as this one :)
 *
 * Learn more here:
 * https://tanstack.com/router/v1/docs/overview
 * */

const rootRoute = createRouteConfig({
  component: DefaultLayout,
});

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: IndexPage,
});

export const routeConfig = rootRoute.addChildren([indexRoute]);

export const appRouter = createReactRouter({
  routeConfig,
  defaultPreload: 'intent',
  defaultPendingComponent: () => <CircularProgress />,
});
