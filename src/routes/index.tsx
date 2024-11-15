import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from '../components/layout/Layout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import PrivateRoute from '../components/auth/PrivateRoute';
import { routeConfig } from './config';
import type { AppRouteObject } from '../types/route';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Transform route configuration to add Layout and wrappers
const transformRoutes = (routes: AppRouteObject[]): RouteObject[] => {
  return routes.map(route => ({
    ...route,
    element: route.path === '/' ? <Layout /> : route.element,
    children: route.children?.map(child => {
      const element = (
        <Suspense fallback={<PageLoader />}>
          {child.requireAuth !== undefined ? (
            <PrivateRoute requireAuth={child.requireAuth}>
              {child.Component && <child.Component />}
            </PrivateRoute>
          ) : (
            child.Component && <child.Component />
          )}
        </Suspense>
      );

      // Only spread the properties we want to exclude
      const { ...routeProps } = child;
      delete routeProps.Component;
      delete routeProps.requireAuth;
      
      return {
        ...routeProps,
        element,
      };
    }),
  })) as RouteObject[];
};

// Create and export the router
export const router = createBrowserRouter(transformRoutes(routeConfig));