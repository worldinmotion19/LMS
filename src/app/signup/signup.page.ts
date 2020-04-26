import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  username:string;
  password:string;
  confirmPassword: string;
  uname: string; //Employee Name
  eid: number; // Employee ID
  
  async signupUser(): Promise<void> {
    if (this.password != this.confirmPassword) {
     
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Confirm password does not match.',
        buttons: ['OK']
      });
      await alert.present();
    }
    else
    {
      this.authService.signupUser(this.username, this.password).then(
        () => {
          this.router.navigateByUrl('home');
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
        this.router.navigateByUrl('signup');
      }
        
    });
  } 
}
