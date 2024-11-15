import { RouteObject } from 'react-router-dom';
import { LazyExoticComponent, ComponentType } from 'react';

export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  Component?: LazyExoticComponent<ComponentType<any>>;
  requireAuth?: boolean;
  children?: AppRouteObject[];
}

export interface IndexRouteObject extends Omit<AppRouteObject, 'children' | 'index'> {
  index: true;
}

export interface NonIndexRouteObject extends AppRouteObject {
  index?: false;
  path: string;
}

export type AppRouteObjects = IndexRouteObject | NonIndexRouteObject; 