import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'starter',
    name: 'Inicio',
    type: 'link',
    icon: 'content_copy'
  },
  {
    state: 'admin',
    name: 'Administración',
    type: 'sub',
    icon: 'widgets',
    // badge: [{ type: 'red', value: '17' }],
    children: [
      { state: 'badge', name: 'Usuarios', type: 'link' },
      { state: 'button', name: 'Clientes', type: 'link' },
    ]
  },
  {
    state: 'app',
    name: 'Planificación',
    type: 'sub',
    icon: 'local_shipping',
    children: [
      { state: 'badge', name: 'Rutas', type: 'link' },
    ]
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
