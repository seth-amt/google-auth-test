declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [CommonModule]
})
export class CardComponent {
  ngOnInit() {
    function decodeJWT(response: any) {
      const details = JSON.parse(atob(response.split('.')[1]))
      const json = JSON.stringify(details)
      sessionStorage.setItem('personal', json)
      sessionStorage.setItem('name', details.name)
      sessionStorage.setItem('email', details.email)
      sessionStorage.setItem('picture', details.picture)
    }

    google.accounts.id.initialize({
      client_id: "1068000599152-v4pat5sf2s5k9eljrv1h8opbe6b0dai3.apps.googleusercontent.com",
      callback: (response: any) => {
        decodeJWT(response.credential)
      },
      context: "signin",  //this can take 'signup', 'signin' and 'use'
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // function onClickHandler(){
    //   console.log("Sign in with Google button clicked...")
    // }

    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        type: "standard", // type of button (i.e 'icon' for icon button or 'standard' for normal text with button)
        theme: "outline", // theming of button (other options: 'outline', 'filled_blue', 'filled_black')
        size: "large", // size of button (px)
        locale: "en", //change language of button text
        shape: "rectangular", //change language of button shape (options: rectangular, circle, pill, square)
        // click_listener: onClickHandle // You can define a JavaScript function to be called when the Sign in with Google button is clicked using the click_listener attribute
      }
    );
  }
}
