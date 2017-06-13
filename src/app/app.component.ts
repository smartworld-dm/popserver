import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private elRef:ElementRef) {}
    ngOnInit(){
      let body = document.getElementsByTagName('body')[0];
      var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
      if (isWindows){
          // if we are on windows OS we activate the perfectScrollbar function
          body.classList.add("perfect-scrollbar-on");
      } else {
          body.classList.add("perfect-scrollbar-off");
      }
      $.material.init();
    }
}
