import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './guards';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'login',
        canActivate: [noAuthGuard],
        component: LoginComponent,
        title: 'Login page'
    },
    {
        path: 'sign-up',
        canActivate: [noAuthGuard],
        component: SignUpComponent,
        title: 'Sign up page'
    },
    {
        path: 'cart',
        canActivate: [authGuard],
        component: CartComponent,
        title: 'Shopping cart'
    },
    {
        path: 'product/:product_id',
        component: ProductComponent,
        title: 'Product details'
    },
    {
        path: 'products/:category',
        component: ProductsComponent,
        title: 'Products Category page'
    },
];
