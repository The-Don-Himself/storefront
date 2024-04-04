import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login page'
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'Sign up page'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Shopping cart'
    },
    {
        path: 'product/:id',
        component: ProductComponent,
        title: 'Product details'
    }
];
