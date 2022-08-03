import { RouteObject } from 'react-router-dom'

interface MetaType {
  [propName: string]: any;
}

interface FunctionalImportType {
  (): any;
}

interface RoutesItemType extends RouteObject {
  asyncElement?: FunctionalImportType;
  meta?: MetaType;
  children?: RoutesItemType[];
}

type RoutesType = RoutesItemType[]


export type {
  RoutesType
}