import { Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { QaComponent } from './qa/qa.component';
import { HomeComponent } from './home/home.component';
//import { FormComponent } from './form/form.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CalculatorComponent } from './calculator/calculator.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [ 
    { path: 'home', component: HomeComponent ,data: { title: 'EasyBank' } },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'services', component: ServicesComponent , },
    { path: 'company', component: AboutComponent } ,
    { path: 'conatct', component: ContactComponent } ,
    { path: 'qa', component: QaComponent},
    //{ path: 'form',component: FormComponent , data: { title: 'Form' }} ,
   // { path: 'loan-calculator', component: CalculatorComponent }
    { path: 'loan-calculator', component: LoginComponent },
    { path: 'Register', component:RegisterComponent}





];
 

  

  
