import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Books',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Add Books',
      url: '/add-books',
      icon: 'book'
    }
  ];

  public loginUrl = '/login';
  usrName: string;
  role:string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.authService.checkUser().then(exists => {
      if(exists)
      {
        console.log("user logged in!!!!!!!");
        this.usrName = localStorage.getItem("usrName");
    
        this.authService.getUserDetails(this.usrName).then(res => {
          this.usrName = res.name;

          if(res.role == 'user')
          {
            console.log("role is "+res.role);
            this.appPages.splice(2,1);
          }

          console.log("welcome "+res.role+" "+res.name);
        });
      }
    });

    

    
  }

  logoutUser()
  {
    this.authService.logoutUser();
  }
  
}
