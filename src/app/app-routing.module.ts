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
    path: 'home/:type',
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
  // {
  //   path: '',
  //   loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  // },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),



  },
  {
    path: 'login/:MobileNo/:Password',
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
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'product-page/:name/:restId/:type',
    loadChildren: () => import('./product-page/product-page.module').then( m => m.ProductPagePageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'product-page/:name/:restId/:menuId/:type',
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
  {
    path: 'otp-verification/:mobileNo/:firstName/:userType/:otpType',
    loadChildren: () => import('./otp-verification/otp-verification.module').then( m => m.OtpVerificationPageModule)
  },
  {
    path: 'orders-admin',
    loadChildren: () => import('./orders-admin/orders-admin.module').then( m => m.OrdersAdminPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'orders-dashboard-admin',
    loadChildren: () => import('./orders-dashboard-admin/orders-dashboard-admin.module').then( m => m.OrdersDashboardAdminPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'orders-delivery-admin',
    loadChildren: () => import('./orders-delivery-admin/orders-delivery-admin.module').then( m => m.OrdersDeliveryAdminPageModule),
    canActivate:[AuthenticationGuard]
  },
  {
    path: 'delivery-location',
    loadChildren: () => import('./delivery-location/delivery-location.module').then( m => m.DeliveryLocationPageModule)
  },
  {
    path: 'delivery-customise',
    loadChildren: () => import('./delivery-customise/delivery-customise.module').then( m => m.DeliveryCustomisePageModule)
  },
  {
    path: 'admin-rest-management',
    loadChildren: () => import('./admin-rest-management/admin-rest-management.module').then( m => m.AdminRestManagementPageModule)
  },
  {
    path: 'menu-status',
    loadChildren: () => import('./menu-status/menu-status.module').then( m => m.MenuStatusPageModule)
  },
  {
    path: 'products/:name/:restId/:type',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },

  {
    path: 'products/:category/:type',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'payment/:totalAmount',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'change-location',
    loadChildren: () => import('./change-location/change-location.module').then( m => m.ChangeLocationPageModule)
  },
  {
    path: 'location-set-up',
    loadChildren: () => import('./location-set-up/location-set-up.module').then( m => m.LocationSetUpPageModule)
  },
  {
    path: 'popover-types',
    loadChildren: () => import('./popover-types/popover-types.module').then( m => m.PopoverTypesPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },

  {
    path: 'buddy',
    loadChildren: () => import('./buddy/buddy.module').then( m => m.BuddyPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'setup-location',
    loadChildren: () => import('./setup-location/setup-location.module').then( m => m.SetupLocationPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
