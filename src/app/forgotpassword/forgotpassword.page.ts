import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {AlertController} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit{

  constructor(public alertCtrl: AlertController, private authService: AuthService, private router: Router) { }
  email:string;
  
 
  //  resetPassword(): Promise<void> {
  //   console.log("Email=",this.email);
  //   return firebase.auth().sendPasswordResetEmail(this.email)
  // }

  async resetPassword(): Promise<void> {
    this.authService.resetPassword(this.email).then(
      async () => {
        const alert = await this.alertCtrl.create({
          header: 'Alert',
          message: 'Reset Password link sent successfully.',
          buttons: ['OK']
        });
        await alert.present();

        this.router.navigateByUrl('login');
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await alert.present();
      }
    );
  }

  ngOnInit()
  { 
    this.checkUserLoggedIn();
  }

  async checkUserLoggedIn(): Promise<void> {
    this.authService.checkUser().then(exists => {
      if(exists)
      {
        this.router.navigateByUrl('home');
      }
      else
      {
        this.router.navigateByUrl('forgotpassword');
      }
        
    });
  }
}

