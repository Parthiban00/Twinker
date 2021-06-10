import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';
import {AuthenticationGuard} from './authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthenticationGuard]
  },

  {
    path: 'home/:firstName/:id',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthenticationGuard]
  },
  // {
  //   path: '',
  //   redirectTo: 'home/:firstName/:id',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),



  },

  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserPageModule),

  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'product-page/:name/:restId',
    loadChildren: () => import('./product-page/product-page.module').then( m => m.ProductPagePageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'restaurant-dashboard',
    loadChildren: () => import('./restaurant-dashboard/restaurant-dashboard.module').then( m => m.RestaurantDashboardPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'delivery-partner',
    loadChildren: () => import('./delivery-partner/delivery-partner.module').then( m => m.DeliveryPartnerPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'restaurant-owner-dashboard',
    loadChildren: () => import('./restaurant-owner-dashboard/restaurant-owner-dashboard.module').then( m => m.RestaurantOwnerDashboardPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'orders-management',
    loadChildren: () => import('./orders-management/orders-management.module').then( m => m.OrdersManagementPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'delivery-partner-dashboard',
    loadChildren: () => import('./delivery-partner-dashboard/delivery-partner-dashboard.module').then( m => m.DeliveryPartnerDashboardPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'orders-delivery-partner',
    loadChildren: () => import('./orders-delivery-partner/orders-delivery-partner.module').then( m => m.OrdersDeliveryPartnerPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
