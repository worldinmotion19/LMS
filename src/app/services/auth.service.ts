import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(public afs: AngularFirestore, private http: HttpClient) { }

  userEmail:string;
  usrData:any;
  userName: string;

  itemCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }  

  signupUser(email: string, password: string, uname:string, eid:string): Promise<any> {
    this.createUser(email,uname,eid);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  createUser(email: string, uname:string, empid:string)
  {
    return this.afs.collection('users').doc(empid) //document_id
      .set({
            books: [],
            email: email,
            name: uname,
            role: 'user'
          }); 
  }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void> {
    localStorage.setItem("usrName", '');
    return firebase.auth().signOut();
  }

  checkUser(): Promise<boolean> 
  {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          resolve(true);
          // this.getUserDetails(user.email).then((res) => {
             this.userEmail = user.email;
          // });
          //console.log("user logged in --> "+this.userEmail);
          
          localStorage.setItem("usrName", user.email);
        } else {
          // No user is signed in.
          localStorage.setItem("usrName", '');
          resolve(false);    
        }
      })
   });  
  }

  getUserDetails(email)
  {
    return new Promise<any>((resolve, reject) => {
      this.http.get('https://us-central1-lms-manh-23bd7.cloudfunctions.net/getUserDetails?text='+email).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  }

}
